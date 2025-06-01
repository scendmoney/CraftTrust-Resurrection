import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { FilterGetDTO, GetIdStringDTO } from '@common/query/query.dto';
import { SortDirectionEnum } from '@enums/common';
import QueryService from '@common/query';
import { FacilityModel } from '../facility.model';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { FacilitiesDTO } from '../facility.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';

@Resolver(() => FacilityModel)
export class FacilityAdminResolver {
  constructor(
    private readonly dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  @Query(() => FacilitiesDTO, {
    description: '@protected - List Facilities (admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async facilities(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations },
  ): Promise<FacilitiesDTO> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    const where = QueryService.getFilters(filters);

    const [items, total] = await this.dataSource
      .getRepository(FacilityModel)
      .findAndCount({
        order,
        where: {
          ...where,
        },
        ...paginate,
        relations,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => FacilityModel, {
    description: '@protected - Get facility by id (admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async facilityByIdAdmin(
    @Args('payload', { type: () => GetIdStringDTO })
    payload: GetIdStringDTO,
    @CurrentCtx() { relations },
  ): Promise<FacilityModel> {
    const facility = await this.dataSource
      .getRepository(FacilityModel)
      .findOne({
        where: {
          id: payload.id,
        },
        relations,
      });
    if (!facility) throw Error(ErrorMsgEnum.EntityNotExist);
    return facility;
  }

  @Mutation(() => Boolean, {
    description: '@protected - migrate facility to customerIo',
  })
  // @UseGuards(AuthGuardAdmin)
  async migrateFacilityToCustomerIo(): Promise<boolean> {
    const facilities = await this.dataSource
      .getRepository(FacilityModel)
      .find({ select: ['id'] });

    for (const facility of facilities) {
      this.eventEmitter.emit(CustomerIoTypesEnum.facilityIdentify, facility.id);
    }
    return true;
  }
}
