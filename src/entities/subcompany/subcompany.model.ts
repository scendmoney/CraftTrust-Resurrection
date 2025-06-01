import { Dates } from '@entities/embedded/date';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { FacilityModel } from '@entities/facility/facility.model';
import { CompanyModel } from '@entities/company/company.model';
import { SurveyModel } from '@entities/survey/survey.model';

@ObjectType({ description: "Model's subcompany" })
@Entity('subcompany')
export class SubcompanyModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => Float, {
    nullable: false,
    description: 'Reward quantity (lb)',
  })
  @Check(`"quantity" >= 0`)
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'quantity',
    default: 0,
    unsigned: true,
  })
  quantity: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Reward quantity sold (lb)',
  })
  @Check(`"quantity_sold" >= 0`)
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'quantity_sold',
    default: 0,
    unsigned: true,
  })
  quantitySold: number;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is Survey Pending',
  })
  @Column({
    type: 'boolean',
    name: 'is_survey_pending',
    nullable: false,
    default: false,
  })
  isSurveyPending: boolean;

  @Field(() => CompanyModel, { nullable: false, description: 'Company' })
  @ManyToOne(() => CompanyModel, (item) => item.subcompanies, {
    cascade: ['insert', 'update'],
    lazy: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
  })
  company?: Relation<CompanyModel>;
  __company__: Relation<CompanyModel>;

  @Field(() => [SurveyModel], { nullable: false })
  @OneToMany(() => SurveyModel, (item) => item.subcompany, {
    lazy: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  surveys: Relation<SurveyModel[]>;
  __surveys__: Relation<SurveyModel[]>;

  @Field(() => FacilityModel, { nullable: true })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'facility_buyer_id', referencedColumnName: 'id' })
  facilityBuyer?: Relation<FacilityModel>;
  __facilityBuyer__?: Relation<FacilityModel>;

  @Field(() => String, { nullable: true, description: 'URL For QR Invite' })
  URLForQRInvite?: string;
}
