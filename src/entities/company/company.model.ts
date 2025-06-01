import { Dates } from '@entities/embedded/date';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { CompanyStatusEnum } from './company.enum';
import { FacilityModel } from '@entities/facility/facility.model';
import { ProductModel } from '@entities/product/product.model';
import { IsDateString, IsOptional } from 'class-validator';
import { SubcompanyModel } from '@entities/subcompany/subcompany.model';

@Index(['facilityCultivator'])
@ObjectType({ description: "Model's company" })
@Entity('company')
export class CompanyModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @IsDateString()
  @Field(() => String, {
    nullable: false,
    description: "Company's Date Start company",
  })
  @Column({
    type: 'date',
    nullable: false,
    name: 'date_start',
  })
  dateStart: string;

  @IsOptional()
  @IsDateString()
  @Field(() => String, {
    nullable: true,
    description: "Company's Date End company",
  })
  @Column({
    type: 'date',
    nullable: true,
    name: 'date_end',
  })
  dateEnd: string;

  @Field(() => String, {
    nullable: false,
    description: 'Company Name',
  })
  @Column({
    type: 'varchar',
    name: 'company_name',
    length: 255,
    nullable: false,
    default: '',
  })
  companyName: string;

  @Field(() => CompanyStatusEnum, {
    nullable: false,
    description: "Company's Status",
  })
  @Column({
    type: 'enum',
    enum: CompanyStatusEnum,
    name: 'status',
    nullable: false,
    default: CompanyStatusEnum.Draft,
  })
  status: CompanyStatusEnum;

  @Field(() => Int, {
    nullable: false,
    description: 'Reward quantity (lb)',
  })
  @Check(`"quantity" >= 0`)
  @Column({
    type: 'integer',
    name: 'quantity',
    default: 0,
    unsigned: true,
  })
  quantity: number;

  @Field(() => Int, {
    nullable: false,
    description: 'Reward quantity sold (lb)',
  })
  @Column({
    type: 'integer',
    name: 'quantity_sold',
    default: 0,
    unsigned: true,
  })
  quantitySold: number;

  @Field(() => Int, {
    nullable: false,
    description: 'Unit Weight(gram)',
  })
  @Check(`"unit_weight" > 0`)
  @Column({
    type: 'integer',
    name: 'unit_weight',
    default: 1,
    unsigned: true,
  })
  unitWeight: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Total unit gram',
  })
  @Column({
    type: 'integer',
    name: 'total_gram',
    default: 0,
    unsigned: true,
  })
  totalGram: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Total unit lb',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    name: 'total_lb',
    default: 0,
    unsigned: true,
  })
  totalLb: number;

  @Field(() => Int, {
    nullable: false,
  })
  @Column({
    type: 'integer',
    name: 'total_people_registered',
    default: 0,
    unsigned: true,
  })
  totalPeopleRegistered: number;

  @Field(() => Int, {
    nullable: false,
  })
  @Column({
    type: 'integer',
    name: 'total_people_completed',
    default: 0,
    unsigned: true,
  })
  totalPeopleCompleted: number;

  @Field(() => Int, {
    nullable: false,
  })
  @Column({
    type: 'integer',
    name: 'total_people_redemption',
    default: 0,
    unsigned: true,
  })
  totalPeopleRedemption: number;

  @Field(() => FacilityModel, { nullable: false })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'facility_cultivator_id', referencedColumnName: 'id' })
  facilityCultivator: Relation<FacilityModel>;
  __facilityCultivator__: Relation<FacilityModel>;

  @Field(() => ProductModel, { nullable: false })
  @ManyToOne(() => ProductModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: ['insert', 'update'],
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'product_survey_id', referencedColumnName: 'id' })
  productSurvey: Relation<ProductModel>;
  __productSurvey__: Relation<ProductModel>;

  @Field(() => [SubcompanyModel], { nullable: false })
  @OneToMany(() => SubcompanyModel, (item) => item.company, {
    lazy: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  subcompanies: Relation<SubcompanyModel[]>;
  __subcompanies__: Relation<SubcompanyModel[]>;
}
