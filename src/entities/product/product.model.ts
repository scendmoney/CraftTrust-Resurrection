import {
  ObjectType,
  Field,
  Int,
  Float,
  GraphQLISODateTime,
  HideField,
} from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Relation,
  PrimaryColumn,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
  Check,
  BeforeInsert,
  ManyToMany,
  Index,
  BeforeUpdate,
} from 'typeorm';
import { Dates } from '../embedded/date';
import {
  LabTestingEnum,
  PackageTypeEnum,
  ProductStatusEnum,
  UnitsOfMeasureAbbreviationEnum,
  UnitsOfMeasureNameEnum,
} from './product.enum';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { FacilityModel } from '@entities/facility/facility.model';
import { AssetModel } from '@entities/asset/asset.model';
import { ItemModel } from '@entities/item/item.model';
import { OrderModel } from '@entities/order/order.model';
import { CompanyModel } from '@entities/company/company.model';

@Index(['facility'])
@ObjectType({ description: "Model's product", isAbstract: true })
@Entity('product_tree')
@Tree('closure-table', {
  closureTableName: 'product_tree',
  ancestorColumnName: (column) => `ancestor_${column.propertyName}`,
  descendantColumnName: (column) => `descendant_${column.propertyName}`,
})
export class ProductModel extends BaseEntity {
  @Field(() => Int, {
    nullable: false,
    description: 'Id product',
  })
  @PrimaryColumn({
    type: 'integer',
    name: 'id',
    nullable: false,
  })
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => [ProductModel], { nullable: true })
  @TreeChildren()
  children?: ProductModel[];

  @Field(() => ProductModel, { nullable: true })
  @TreeParent()
  parent?: ProductModel;

  @IsOptional()
  @IsNumber()
  @Max(10000000)
  @Min(0.01)
  @Field(() => Float, { nullable: false, description: 'price' })
  @Column({
    type: 'numeric',
    name: 'price',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  price: number;

  @Field(() => String, {
    nullable: true,
    description: 'Description',
  })
  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description?: string;

  @Field(() => ProductStatusEnum, {
    nullable: false,
    description: 'Product status: draft|unpublished|published',
  })
  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    name: 'status',
    nullable: false,
    default: ProductStatusEnum.new,
  })
  status: ProductStatusEnum;

  @HideField()
  @Column({
    type: 'decimal',
    precision: 30,
    scale: 2,
    name: 'quantity_metrc',
    default: 0,
  })
  quantityMetrc: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Product ALL(lb)',
  })
  @Check(`"quantity" >= 0`)
  @Column({
    type: 'decimal',
    precision: 30,
    scale: 2,
    name: 'quantity',
    default: 0,
    unsigned: true,
  })
  quantity: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Product quantity stock min (lb)',
  })
  @Check(`"quantity_stock_min" >= 0`)
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'quantity_stock_min',
    default: 0.25,
    unsigned: true,
  })
  quantityStockMin: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Product quantity stock (lb)',
  })
  @Check(`"quantity_stock" >= 0`)
  @Column({
    type: 'decimal',
    precision: 30,
    scale: 2,
    name: 'quantity_stock',
    default: 0,
    unsigned: true,
  })
  quantityStock: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Product quantity when creation (lb)',
  })
  @Column({
    type: 'decimal',
    precision: 30,
    scale: 2,
    name: 'quantity_when_creation',
    default: 0,
    unsigned: true,
  })
  quantityWhenCreation: number;

  @Field(() => FacilityModel, { nullable: false })
  @ManyToOne(() => FacilityModel, (facility) => facility.id, {
    lazy: true,
  })
  @JoinColumn({ name: 'facility_id', referencedColumnName: 'id' })
  facility: Relation<FacilityModel>;
  __facility__: Relation<FacilityModel>;

  @Field(() => AssetModel, { nullable: true })
  @ManyToOne(() => AssetModel, (asset) => asset.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'thumbnail_id', referencedColumnName: 'id' })
  thumbnail?: Relation<AssetModel>;
  __thumbnail__: Relation<AssetModel>;

  @Field(() => [AssetModel], { nullable: true })
  @OneToMany(() => AssetModel, (asset) => asset.product, {
    lazy: true,
    cascade: true,
    nullable: true,
  })
  assets?: Relation<AssetModel[]>;
  __assets__?: Relation<AssetModel[]>;
  // common fields end

  // product fields
  @Field(() => ItemModel, { nullable: false })
  @ManyToOne(() => ItemModel, (facility) => facility.id, {
    lazy: false,
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
  item: Relation<ItemModel>;

  @Field(() => String, {
    nullable: false,
    description: 'Product label',
  })
  @Column({
    type: 'varchar',
    name: 'label',
    nullable: false,
  })
  label: string;

  @Field(() => String, {
    nullable: true,
    description: 'Product label parent',
  })
  @Column({
    type: 'varchar',
    name: 'source_package_labels',
    nullable: true,
  })
  sourcePackageLabels?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Package type',
  })
  @Column({
    type: 'enum',
    enum: PackageTypeEnum,
    name: 'package_type',
    nullable: true,
  })
  packageType?: PackageTypeEnum;

  @Field(() => Int, {
    nullable: false,
    description: 'Source harvest count',
  })
  @Column({
    type: 'integer',
    name: 'source_harvest_count',
    nullable: false,
    default: 0,
  })
  sourceHarvestCount: number;

  @Field(() => Int, {
    nullable: false,
    description: 'Source Package count',
  })
  @Column({
    type: 'integer',
    name: 'source_package_count',
    nullable: false,
    default: 0,
  })
  sourcePackageCount: number;

  @Field(() => Int, {
    nullable: false,
    description: 'Source Processing Job count',
  })
  @Column({
    type: 'integer',
    name: 'source_processing_job_count',
    nullable: false,
    default: 0,
  })
  sourceProcessingJobCount: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Location Id',
  })
  @Column({
    type: 'integer',
    name: 'location_id',
    nullable: true,
  })
  locationId?: number;

  @Field(() => String, {
    nullable: true,
    description: 'Location name',
  })
  @Column({
    type: 'varchar',
    name: 'location_name',
    nullable: true,
  })
  locationName?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Location type name',
  })
  @Column({
    type: 'varchar',
    name: 'location_type_name',
    nullable: true,
  })
  locationTypeName?: string;

  @Field(() => UnitsOfMeasureNameEnum, {
    nullable: true,
    description: 'Unit of measure name',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureNameEnum,
    name: 'unit_of_measure_name',
    nullable: true,
  })
  unitOfMeasureName?: UnitsOfMeasureNameEnum;

  @Field(() => UnitsOfMeasureAbbreviationEnum, {
    nullable: true,
    description: 'Unit of Measure abbreviation',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureAbbreviationEnum,
    name: 'unit_of_measure_abbreviation',
    nullable: true,
  })
  unitOfMeasureAbbreviation?: UnitsOfMeasureAbbreviationEnum;

  @Field(() => String, {
    nullable: false,
    description: 'Packaged Date',
  })
  @Column({
    type: 'date',
    name: 'packaged_date',
    nullable: false,
  })
  packagedDate: string;

  @Field(() => LabTestingEnum, {
    nullable: true,
    description: 'Initial Lab Testing State',
  })
  @Column({
    type: 'enum',
    enum: LabTestingEnum,
    name: 'initial_lab_testing_state',
    nullable: true,
  })
  initialLabTestingState?: LabTestingEnum;

  @Field(() => LabTestingEnum, {
    nullable: true,
    description: 'Lab Testing State',
  })
  @Column({
    type: 'enum',
    enum: LabTestingEnum,
    name: 'lab_testing_state',
    nullable: true,
  })
  labTestingState?: LabTestingEnum;

  @Field(() => String, {
    nullable: false,
    description: 'Lab Testing State Date',
  })
  @Column({
    type: 'date',
    name: 'lab_testing_state_date',
    nullable: false,
  })
  labTestingStateDate: string;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is On Hold',
  })
  @Column({
    type: 'boolean',
    name: 'is_on_hold',
    nullable: false,
    default: false,
  })
  isOnHold: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is On Trip',
  })
  @Column({
    type: 'boolean',
    name: 'is_on_trip',
    nullable: false,
    default: false,
  })
  isOnTrip: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is On Retailer Delivery',
  })
  @Column({
    type: 'boolean',
    name: 'is_on_retailer_delivery',
    nullable: false,
    default: false,
  })
  isOnRetailerDelivery: boolean;

  @Field(() => GraphQLISODateTime, {
    nullable: false,
    description: 'Last Modified Date',
  })
  @Column({
    type: 'timestamptz',
    name: 'last_modified',
    nullable: false,
  })
  lastModified: Date;

  @Field(() => [String], { nullable: true })
  @Column({
    type: 'varchar',
    length: 100,
    array: true,
    nullable: true,
    name: 'lab_test_documents',
  })
  labTestDocuments?: string[];

  @Field(() => [String], { nullable: true })
  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
    name: 'terpenes',
  })
  terpenes?: string[];

  @Field(() => String, {
    nullable: true,
    description: 'Genetic cross',
  })
  @Column({
    type: 'varchar',
    name: 'genetic_cross',
    nullable: true,
  })
  geneticCross?: string;

  @Field(() => Float, { nullable: false, description: 'Total THC' })
  @Column({
    type: 'numeric',
    name: 'total_thc',
    default: 0,
    scale: 2,
    precision: 4,
    nullable: false,
  })
  totalTHC: number;

  @Field(() => Float, { nullable: false, description: 'Total CBD' })
  @Column({
    type: 'numeric',
    name: 'total_cbd',
    default: 0,
    scale: 2,
    precision: 4,
    nullable: false,
  })
  totalCBD: number;

  @HideField()
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'sync_date',
  })
  syncDate?: Date;

  @Field(() => OrderModel, { nullable: true })
  orderResolve?: OrderModel;

  @Field(() => [CompanyModel], { nullable: false })
  @ManyToMany(() => CompanyModel, (companies) => companies.productSurvey, {
    lazy: true,
    nullable: false,
  })
  companies: Relation<CompanyModel[]>;
  __companies__: Relation<CompanyModel[]>;

  @BeforeInsert()
  quantityStockUpdate() {
    this.quantityWhenCreation = this.quantity;
  }

  @BeforeUpdate()
  async quantityStockBeforeUpdate() {
    const productDb = await ProductModel.findOne({
      where: { id: this.id },
      select: ['id', 'quantityStock', 'quantityStockMin'],
    });
    if (productDb && this.quantity < productDb.quantityStock) {
      if (
        productDb.quantityStockMin !== 0 &&
        productDb.quantityStockMin < this.quantity
      ) {
        this.quantityStock = this.quantity;
      } else {
        this.quantityStock = 0;
        this.status = ProductStatusEnum.unlisted;
      }
    }
  }
}
