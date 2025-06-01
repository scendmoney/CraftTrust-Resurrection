import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { SurveyModel } from './survey.model';
import { Max, Min } from 'class-validator';
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
} from './survey.enum';

@InputType()
export class CreateSurveyInput {
  @Field(() => Int, {
    nullable: false,
    description: 'subcompany',
  })
  subcompanyId: number;
}

@InputType()
export class SubmitSurveyInput extends PickType(
  SurveyModel,
  ['id'],
  InputType,
) {
  @Field(() => AppealingVisuallyEnum, {
    nullable: false,
  })
  appealingVisually: AppealingVisuallyEnum;

  @Field(() => ColorEnum, {
    nullable: false,
  })
  color: ColorEnum;

  @Min(1, { each: true })
  @Max(8, { each: true })
  @Field(() => [Number], {
    nullable: false,
  })
  aromaSmells: number[];

  @Field(() => NoseEnum, {
    nullable: false,
  })
  nose: NoseEnum;

  @Field(() => SmokedEnum, {
    nullable: false,
  })
  smoked: SmokedEnum;

  @Field(() => ExperienceEnum, {
    nullable: false,
  })
  experience: ExperienceEnum;

  @Field(() => IntoxicationEnum, {
    nullable: false,
  })
  intoxication: IntoxicationEnum;

  @Field(() => SurveyOftenConsumeCannabisEnum, {
    nullable: false,
  })
  oftenConsumeCannabis: SurveyOftenConsumeCannabisEnum;

  @Field(() => PrimaryPurposeEnum, {
    nullable: false,
  })
  primaryPurpose: PrimaryPurposeEnum;

  @Min(1)
  @Max(5)
  @Field(() => Int, {
    nullable: false,
    description: 'age range',
  })
  ageRange: number;

  @Field(() => SurveyGenderEnum, {
    nullable: false,
  })
  gender: SurveyGenderEnum;
}
