import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentCtx } from '../auth/auth.decorator';
import { AuthGuardUser } from '../auth/auth.guard';
import { DataSource, DeepPartial } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { ProductModel } from './product.model';
import { ProductsModel } from './product.dto';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { QueueEnum, SortDirectionEnum } from '@enums/common';
import QueryService from '@common/query';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { StorageService } from 'libs/storage/src';
import { AssetFileTypeEnum } from '@entities/asset/asset.enum';
import { AssetModel } from '@entities/asset/asset.model';
import { MetrcPackagesService } from 'libs/metrc/src';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FacilityModel } from '@entities/facility/facility.model';
import { ProductStatusEnum } from './product.enum';
import { UpdateProductDTO } from './product.input';
import { ProductService } from './product.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';

@Resolver(() => ProductModel)
export class ProductCultivatorResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly storageService: StorageService,
    private readonly metrcPackagesService: MetrcPackagesService,
    @InjectQueue(QueueEnum.queueProduct) private readonly queueProduct: Queue,
    private readonly productService: ProductService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Query(() => ProductsModel, {
    description: '@protected - List of products cultivator',
  })
  @UseGuards(AuthGuardUser)
  async productsCultivator(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { user, relations },
  ): Promise<ProductsModel> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    const where: any = QueryService.getFilters(filters);

    if (where.facility) {
      where.facility.id = user.__context__.id;
    } else {
      where.facility = {
        id: user.__context__.id,
      };
    }

    const [items, total] = await this.dataSource
      .getTreeRepository(ProductModel)
      .findAndCount({
        order,
        where: {
          ...where,
        },
        relations,
        ...paginate,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => ProductModel, {
    description: '@protected - Get product by ID (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async productByIdCultivator(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { user, relations },
  ): Promise<ProductModel> {
    const product = await this.dataSource
      .getTreeRepository(ProductModel)
      .findOne({
        where: {
          id: payload.id,
          facility: {
            id: user.__context__.id,
          },
        },
        relations,
      });
    if (!product) throw Error(ErrorMsgEnum.ProductNotExist);
    return product;
  }

  @Mutation(() => ProductModel, {
    description: '@protected - Update product',
  })
  @UseGuards(AuthGuardUser)
  async updateProduct(
    @Args('payload', {
      type: () => UpdateProductDTO,
      nullable: false,
    })
    payload: UpdateProductDTO,
    @Args('thumbnail', { type: () => GraphQLUpload, nullable: true })
    thumbnail: FileUpload,
    @Args('images', { type: () => [GraphQLUpload], nullable: true })
    images: FileUpload[],
    @CurrentCtx() { user, relations },
  ): Promise<ProductModel> {
    const product = await this.dataSource
      .getTreeRepository(ProductModel)
      .findOne({
        where: {
          id: payload.id,
          facility: {
            id: user.__context__.id,
          },
        },
        select: [
          'id',
          'status',
          'quantityStockMin',
          'price',
          'quantity',
          'quantityStock',
        ],
      });

    if (!product) throw new Error(ErrorMsgEnum.ProductNotExist);

    const updateProductValidate = {
      ...product,
      ...payload,
    };

    if (
      Object.keys(payload).includes('quantityStock') &&
      payload.quantityStock > product.quantity
    ) {
      throw new Error(ErrorMsgEnum.ProductQuantityWrong);
    }

    if (
      Object.keys(payload).includes('status') &&
      payload.status === ProductStatusEnum.listed &&
      (Number(updateProductValidate.price) === 0 ||
        Number(updateProductValidate.quantityStock) === 0 ||
        Number(updateProductValidate.quantityStockMin) === 0 ||
        Number(updateProductValidate.quantityStockMin) >
          Number(updateProductValidate.quantityStock))
    ) {
      throw new Error(ErrorMsgEnum.ProductListedWrong);
    }

    if (
      updateProductValidate.status === ProductStatusEnum.listed &&
      updateProductValidate.quantityStock <
        updateProductValidate.quantityStockMin &&
      updateProductValidate.quantityStock !== 0
    ) {
      throw new Error(ErrorMsgEnum.ProductQuantityStockMin);
    }

    const data: DeepPartial<ProductModel> = {
      id: product.id,
      ...payload,
    };

    if (thumbnail) {
      const image: AssetModel =
        await this.storageService.uploadFiles<AssetModel>(thumbnail);

      data.thumbnail = {
        ...image,
        type: AssetFileTypeEnum.image,
      };
    } else if (thumbnail === null) {
      data.thumbnail = null;
    }

    if (images?.length) {
      const uploadedImages: AssetModel[] = await Promise.all(
        images.map((image) =>
          this.storageService.uploadFiles<AssetModel>(image),
        ),
      );

      data.assets = uploadedImages.map((image) => ({
        ...image,
        type: AssetFileTypeEnum.image,
      }));
    } else if (images === null || images?.length === 0) {
      data.assets = [];
    }

    await this.dataSource.getTreeRepository(ProductModel).create(data).save();
    if (updateProductValidate.status === ProductStatusEnum.listed) {
      this.eventEmitter.emit(CustomerIoTypesEnum.productListing, data.id);
    }
    if (
      product.status === ProductStatusEnum.listed &&
      Object.keys(payload).includes('status') &&
      payload.status != ProductStatusEnum.listed
    ) {
      this.eventEmitter.emit(CustomerIoTypesEnum.productUnlisted, data.id);
    }

    return this.dataSource.getTreeRepository(ProductModel).findOne({
      where: {
        id: payload.id,
      },
      relations,
    });
  }

  @Mutation(() => Boolean, {
    description: '@protected - Add Products',
    deprecationReason: 'Temporary method',
  })
  async deprecatedAddProducts(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
  ) {
    const packagesGenerated = [];
    const [packages] = await Promise.all([
      this.metrcPackagesService.getPackagesByStatus(
        '4ABk0xpkhATaOhFgB81dses94sRCBA2jqV5xrAwX9fpUPZO6',
        'active',
        '060-X0001',
        '1',
        '30',
        '2023-09-27T06:30:00Z',
      ),
    ]);

    for (let i = 1; i < payload.id; i += 1) {
      packagesGenerated.push({
        ...packages.data[i % 2 === 0 ? 0 : 1],
        id: i,
        item: {
          ...packages.data[i % 2 === 0 ? 0 : 1].item,
          id: i,
        },
        facility: {
          id: '060-X0001',
        },
      });
    }

    await this.dataSource
      .getTreeRepository(ProductModel)
      .save(
        this.dataSource
          .getTreeRepository(ProductModel)
          .create(packagesGenerated),
      );

    return true;
  }

  @Mutation(() => Boolean, {
    description: '@protected - sync products',
  })
  @UseGuards(AuthGuardUser)
  async syncProducts(@CurrentCtx() { user }) {
    // if (!user.__context__.__owner__?.id !== user.id) {
    //   throw new Error(ErrorMsgEnum.NoAccess);
    // }

    const facility = await this.dataSource
      .getTreeRepository(FacilityModel)
      .findOne({
        where: {
          id: user.__context__.id,
        },
      });
    await this.productService.syncProducts(facility);

    return true;
  }
}
