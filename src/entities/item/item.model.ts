import {
  LabTestingEnum,
  UnitsOfMeasureNameEnum,
  UnitsOfMeasureQuantityTypeEnum,
} from '@entities/product/product.enum';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType({ description: "Model's item" })
@Entity('item')
export class ItemModel extends BaseEntity {
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

  @Field(() => String, {
    nullable: false,
    description: 'Product name',
  })
  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Product category name',
  })
  @Column({
    type: 'varchar',
    name: 'product_category_name',
    nullable: false,
  })
  productCategoryName: string;

  @Field(() => String, {
    nullable: false,
    description: 'Product category type',
  })
  @Column({
    type: 'varchar',
    name: 'product_category_type',
    nullable: false,
  })
  productCategoryType: string;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is expiration date required',
  })
  @Column({
    type: 'boolean',
    name: 'is_expiration_date_required',
    nullable: false,
    default: false,
  })
  isExpirationDateRequired: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is sell by date required',
  })
  @Column({
    type: 'boolean',
    name: 'is_sell_by_date_required',
    nullable: false,
    default: false,
  })
  isSellByDateRequired: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'is use by date required',
  })
  @Column({
    type: 'boolean',
    name: 'is_use_by_date_required',
    nullable: false,
    default: false,
  })
  isUseByDateRequired: boolean;

  @Field(() => UnitsOfMeasureQuantityTypeEnum, {
    nullable: true,
    description: 'Default lab testing state',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureQuantityTypeEnum,
    name: 'quantity_type',
    nullable: true,
  })
  quantityType: UnitsOfMeasureQuantityTypeEnum;

  @Field(() => String, {
    nullable: true,
    description: 'Default lab testing state',
  })
  @Column({
    type: 'enum',
    enum: LabTestingEnum,
    name: 'default_lab_testing_state',
    nullable: true,
  })
  defaultLabTestingState: LabTestingEnum;

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

  @Field(() => String, {
    nullable: true,
    description: 'Approval status',
  })
  @Column({
    type: 'varchar',
    name: 'approval_status',
    nullable: true,
  })
  approvalStatus: string;

  @Field(() => String, {
    nullable: true,
    description: 'Approval status date time',
  })
  @Column({
    type: 'timestamp with time zone',
    name: 'approval_status_date_time',
    nullable: true,
  })
  approvalStatusDateTime: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Strain ID',
  })
  @Column({
    type: 'integer',
    name: 'strain_id',
    nullable: true,
  })
  strainId: number;

  @Field(() => String, {
    nullable: true,
    description: 'Strain name',
  })
  @Column({
    type: 'varchar',
    name: 'strain_name',
    nullable: true,
  })
  strainName: string;

  @Field(() => String, {
    nullable: true,
    description: ' brand name',
  })
  @Column({
    type: 'varchar',
    name: 'brand_name',
    nullable: true,
  })
  brandName: string;

  @Field(() => String, {
    nullable: true,
    description: 'Administration method',
  })
  @Column({
    type: 'varchar',
    name: 'administration_method',
    nullable: true,
  })
  administrationMethod: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit CBD percent',
  })
  @Column({
    type: 'numeric',
    name: 'unit_cbd_percent',
    nullable: true,
  })
  unitCbdPercent: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit CBD content',
  })
  @Column({
    type: 'numeric',
    name: 'unit_cbd_content',
    nullable: true,
  })
  unitCbdContent: number;

  @Field(() => UnitsOfMeasureNameEnum, {
    nullable: true,
    description: 'Unit CBD content unit of measure name',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureNameEnum,
    name: 'unit_cbd_content_unit_of_measure_name',
    nullable: true,
  })
  unitCbdContentUnitOfMeasureName?: UnitsOfMeasureNameEnum;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit THC percent',
  })
  @Column({
    type: 'numeric',
    name: 'unit_thc_percent',
    nullable: true,
  })
  unitThcPercent: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit THC content',
  })
  @Column({
    type: 'numeric',
    name: 'unit_thc_content',
    nullable: true,
  })
  unitThcContent: number;

  @Field(() => UnitsOfMeasureNameEnum, {
    nullable: true,
    description: 'Unit THC content unit of measure name',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureNameEnum,
    name: 'unit_thc_content_unit_of_measure_name',
    nullable: true,
  })
  unitThcContentUnitOfMeasureName?: UnitsOfMeasureNameEnum;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit volume',
  })
  @Column({
    type: 'numeric',
    name: 'unit_volume',
    nullable: true,
  })
  unitVolume: number;

  @Field(() => UnitsOfMeasureNameEnum, {
    nullable: true,
    description: 'Unit volume unit of measure name',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureNameEnum,
    name: 'unit_volume_unit_of_measure_name',
    nullable: true,
  })
  unitVolumeUnitOfMeasureName?: UnitsOfMeasureNameEnum;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit CBD content dose',
  })
  @Column({
    type: 'numeric',
    name: 'unit_cbd_content_dose',
    nullable: true,
  })
  unitCbdContentDose: number;

  @Field(() => UnitsOfMeasureNameEnum, {
    nullable: true,
    description: 'Unit CBD content dose unit of measure name',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureNameEnum,
    name: 'unit_cbd_content_dose_unit_of_measure_name',
    nullable: true,
  })
  unitCbdContentDoseUnitOfMeasureName?: UnitsOfMeasureNameEnum;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit THC content dose',
  })
  @Column({
    type: 'numeric',
    name: 'unit_thc_content_dose',
    nullable: true,
  })
  unitThcContentDose: number;

  @Field(() => UnitsOfMeasureNameEnum, {
    nullable: true,
    description: 'Unit THC content dose unit of measure name',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureNameEnum,
    name: 'unit_thc_content_dose_unit_of_measure_name',
    nullable: true,
  })
  unitThcContentDoseUnitOfMeasureName?: UnitsOfMeasureNameEnum;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit weight',
  })
  @Column({
    type: 'numeric',
    name: 'unit_weight',
    nullable: true,
  })
  unitWeight: number;

  @Field(() => UnitsOfMeasureNameEnum, {
    nullable: true,
    description: 'Unit weight unit of measure name',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureNameEnum,
    name: 'unit_weight_unit_of_measure_name',
    nullable: true,
  })
  unitWeightUnitOfMeasureName?: UnitsOfMeasureNameEnum;

  @Field(() => String, {
    nullable: true,
    description: 'Serving size',
  })
  @Column({
    type: 'varchar',
    name: 'serving_size',
    nullable: true,
  })
  servingSize: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Supply duration days',
  })
  @Column({
    type: 'integer',
    name: 'supply_duration_days',
    nullable: true,
  })
  supplyDurationDays: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Number of doses',
  })
  @Column({
    type: 'integer',
    name: 'number_of_doses',
    nullable: true,
  })
  numberOfDoses: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Unit quantity',
  })
  @Column({
    type: 'numeric',
    name: 'unit_quantity',
    nullable: true,
  })
  unitQuantity: number;

  @Field(() => UnitsOfMeasureNameEnum, {
    nullable: true,
    description: 'Unit quantity unit of measure name',
  })
  @Column({
    type: 'enum',
    enum: UnitsOfMeasureNameEnum,
    name: 'unit_quantity_unit_of_measure_name',
    nullable: true,
  })
  unitQuantityUnitOfMeasureName?: UnitsOfMeasureNameEnum;

  @Field(() => String, {
    nullable: true,
    description: 'Public ingredients',
  })
  @Column({
    type: 'text',
    name: 'public_ingredients',
    nullable: true,
  })
  publicIngredients: string;

  @Field(() => String, {
    nullable: true,
    description: 'Description',
  })
  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description: string;

  @Field(() => String, {
    nullable: true,
    description: 'Product images',
  })
  @Column({
    type: 'jsonb',
    name: 'product_images',
    nullable: true,
  })
  productImages: string[];

  @Field(() => String, {
    nullable: true,
    description: 'Label images',
  })
  @Column({
    type: 'jsonb',
    name: 'label_images',
    nullable: true,
  })
  labelImages: string[];

  @Field(() => String, {
    nullable: true,
    description: 'Packaging images',
  })
  @Column({
    type: 'jsonb',
    name: 'packaging_images',
    nullable: true,
  })
  packagingImages: string[];

  @Field(() => Boolean, {
    nullable: true,
    description: 'Is used',
  })
  @Column({
    type: 'boolean',
    name: 'is_used',
    nullable: false,
    default: false,
  })
  isUsed: boolean;
}
