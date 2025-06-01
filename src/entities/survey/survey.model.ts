import { Dates } from '@entities/embedded/date';
import { SubcompanyModel } from '@entities/subcompany/subcompany.model';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsMobilePhone, Max, Min } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import {
  AppealingVisuallyEnum,
  ColorEnum,
  ExperienceEnum,
  IntoxicationEnum,
  NoseEnum,
  PrimaryPurposeEnum,
  SmokedEnum,
  SurveyGenderEnum,
  SurveyOftenConsumeCannabisEnum,
  SurveyStatusEnum,
} from './survey.enum';
import { UserModel } from '@entities/user/user.model';
import NFTModel from '@entities/nft/nft.model';

@ObjectType({ description: "Model's survey" })
@Entity('survey')
export class SurveyModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => SurveyStatusEnum, {
    nullable: false,
    description: 'status',
  })
  @Column({
    type: 'enum',
    enum: SurveyStatusEnum,
    name: 'status',
    nullable: false,
    default: SurveyStatusEnum.New,
  })
  status: SurveyStatusEnum;

  @Field(() => String, {
    nullable: false,
    description: 'Full Name user',
  })
  @Column({
    type: 'varchar',
    name: 'fullname',
    length: 255,
    nullable: false,
  })
  fullName: string;

  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, {
    nullable: false,
    description: 'Phone number',
  })
  @Column({
    type: 'varchar',
    name: 'phone',
    length: 24,
    nullable: false,
  })
  phone: string;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    name: 'uuid',
    length: 50,
    nullable: false,
    default: '',
  })
  uuid: string;

  @IsOptional()
  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Buyer confirmed Date',
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'buyer_confirmed_date',
  })
  buyerConfirmedDate?: Date;

  @IsOptional()
  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Buyer rejected Date',
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'buyer_rejected_date',
  })
  buyerRejectedDate?: Date;

  @IsOptional()
  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Survey sent date',
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'survey_sent_date',
  })
  surveySentDate?: Date;

  @IsOptional()
  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: "Survey's completed date",
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'completed_date',
  })
  completedDate?: Date;

  @Field(() => SubcompanyModel, { nullable: false })
  @ManyToOne(() => SubcompanyModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcompany_id', referencedColumnName: 'id' })
  subcompany: Relation<SubcompanyModel>;
  __subcompany__: Relation<SubcompanyModel>;

  @IsEnum(AppealingVisuallyEnum)
  @Field(() => AppealingVisuallyEnum, {
    nullable: true,
    description: 'How appealing is the flower/bud visually?',
  })
  @Column({
    type: 'enum',
    enum: AppealingVisuallyEnum,
    name: 'appealing_visually',
    nullable: true,
  })
  appealingVisually?: AppealingVisuallyEnum;

  @IsEnum(ColorEnum)
  @Field(() => ColorEnum, {
    nullable: true,
    description: 'Bud/Hairs Color',
  })
  @Column({
    type: 'enum',
    enum: ColorEnum,
    name: 'color',
    nullable: true,
  })
  color?: ColorEnum;

  @Min(1, { each: true })
  @Max(8, { each: true })
  @Field(() => [Int], { nullable: false, description: 'Aroma/Smells?[1-6]' })
  @Column({
    type: 'smallint',
    name: 'aroma_smells',
    nullable: false,
    default: [],
    array: true,
  })
  aromaSmells: number[];

  @IsEnum(NoseEnum)
  @Field(() => NoseEnum, {
    nullable: true,
    description: 'How loud is the nose?',
  })
  @Column({
    type: 'enum',
    enum: NoseEnum,
    name: 'nose',
    nullable: true,
  })
  nose?: NoseEnum;

  @IsEnum(SmokedEnum)
  @Field(() => SmokedEnum, {
    nullable: true,
    description: 'How is the flavor when smoked?',
  })
  @Column({
    type: 'enum',
    enum: SmokedEnum,
    name: 'smoked',
    nullable: true,
  })
  smoked?: SmokedEnum;

  @IsEnum(ExperienceEnum)
  @Field(() => ExperienceEnum, {
    nullable: true,
    description: 'What kind of “high” did you experience?',
  })
  @Column({
    type: 'enum',
    enum: ExperienceEnum,
    name: 'experience',
    nullable: true,
  })
  experience?: ExperienceEnum;

  @IsEnum(IntoxicationEnum)
  @Field(() => IntoxicationEnum, {
    nullable: true,
    description: 'How strong is the intoxication?',
  })
  @Column({
    type: 'enum',
    enum: IntoxicationEnum,
    name: 'intoxication',
    nullable: true,
  })
  intoxication?: IntoxicationEnum;

  @IsEnum(SurveyOftenConsumeCannabisEnum)
  @Field(() => SurveyOftenConsumeCannabisEnum, {
    nullable: true,
    description: 'How often do you consume cannabis?',
  })
  @Column({
    type: 'enum',
    enum: SurveyOftenConsumeCannabisEnum,
    name: 'often_consume_cannabis',
    nullable: true,
  })
  oftenConsumeCannabis?: SurveyOftenConsumeCannabisEnum;

  @IsEnum(PrimaryPurposeEnum)
  @Field(() => PrimaryPurposeEnum, {
    nullable: true,
    description: 'What is the primary purpose for your consumption?',
  })
  @Column({
    type: 'enum',
    enum: PrimaryPurposeEnum,
    name: 'primary_purpose',
    nullable: true,
  })
  primaryPurpose?: PrimaryPurposeEnum;

  @Min(1)
  @Max(5)
  @Field(() => Int, { nullable: true, description: 'Your age range' })
  @Column({
    type: 'smallint',
    name: 'age_range',
    nullable: true,
  })
  ageRange?: number;

  @IsEnum(SurveyGenderEnum)
  @Field(() => SurveyGenderEnum, {
    nullable: true,
    description: 'Your gender?',
  })
  @Column({
    type: 'enum',
    enum: SurveyGenderEnum,
    name: 'gender',
    nullable: true,
  })
  gender?: SurveyGenderEnum;

  @Field(() => NFTModel, { nullable: true, description: 'nft' })
  @OneToOne(() => NFTModel, (item) => item.survey, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  nft?: Relation<NFTModel>;
  __nft__: Relation<NFTModel>;

  @Field(() => UserModel, { nullable: true, description: 'client' })
  @ManyToOne(() => UserModel, (item) => item.id, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: Relation<UserModel>;
  __user__: Relation<UserModel>;
}
