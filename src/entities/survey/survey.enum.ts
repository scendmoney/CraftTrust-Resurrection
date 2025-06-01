import { registerEnumType } from '@nestjs/graphql';

export enum AppealingVisuallyEnum {
  Low = 'Low',
  Midz = 'Midz',
  Fyre = 'Fyre',
}
registerEnumType(AppealingVisuallyEnum, { name: 'AppealingVisuallyEnum' });

export enum ColorEnum {
  Green = 'Green',
  Yellow = 'Yellow',
  Purple = 'Purple',
}
registerEnumType(ColorEnum, { name: 'ColorEnum' });

export enum NoseEnum {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
registerEnumType(NoseEnum, { name: 'NoseEnum' });

export enum SmokedEnum {
  Mild = 'Mild',
  Medium = 'Medium',
  Strong = 'Strong',
}
registerEnumType(SmokedEnum, { name: 'SmokedEnum' });

export enum ExperienceEnum {
  EuphoricCreative = 'EuphoricCreative',
  HeadyMental = 'HeadyMental',
  RelaxingPainrelieving = 'RelaxingPainrelieving',
  FugginStupid = 'FugginStupid',
}
registerEnumType(ExperienceEnum, { name: 'ExperienceEnum' });

export enum IntoxicationEnum {
  Meh = 'Meh',
  Stoned = 'Stoned',
  Wrecked = 'Wrecked',
}
registerEnumType(IntoxicationEnum, { name: 'IntoxicationEnum' });

export enum SurveyOftenConsumeCannabisEnum {
  Daily = 'Daily',
  Occassionally = 'Occassionally',
  Rarely = 'Rarely',
}
registerEnumType(SurveyOftenConsumeCannabisEnum, {
  name: 'SurveyOftenConsumeCannabisEnum',
});

export enum PrimaryPurposeEnum {
  PainRelief = 'PainRelief',
  MentalHealth = 'MentalHealth',
  Recreation = 'Recreation',
}
registerEnumType(PrimaryPurposeEnum, { name: 'PrimaryPurposeEnum' });

export enum SurveyGenderEnum {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other',
}
registerEnumType(SurveyGenderEnum, { name: 'SurveyGenderEnum' });

export enum SurveyStatusEnum {
  New = 'New',
  Rejected = 'Rejected',
  BuyerConfirmed = 'BuyerConfirmed',
  SurveySent = 'SurveySent',
  Done = 'Done',
}
registerEnumType(SurveyStatusEnum, { name: 'SurveyStatusEnum' });
