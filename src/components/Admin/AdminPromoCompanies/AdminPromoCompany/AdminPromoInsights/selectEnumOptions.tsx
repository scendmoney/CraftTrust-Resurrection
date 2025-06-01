import {
  AppealingVisuallyEnum,
  ColorEnum,
  ExperienceEnum,
  IntoxicationEnum,
  NoseEnum,
  PrimaryPurposeEnum,
  SmokedEnum,
  SurveyGenderEnum,
  SurveyOftenConsumeCannabisEnum
} from 'graphql/_server';

export const genderSurvey = [
  { value: SurveyGenderEnum.Female, label: 'Female' },
  { value: SurveyGenderEnum.Male, label: 'Male' },
  { value: SurveyGenderEnum.Other, label: 'Other' }
];

export const ageRange = [
  { value: 1, label: '21-27' },
  { value: 2, label: '28-43' },
  { value: 3, label: '44-59' },
  { value: 4, label: '60-78' },
  { value: 5, label: '79-96' }
];

export const oftenConsumeSurvey = [
  { value: SurveyOftenConsumeCannabisEnum.Daily, label: 'Daily' },
  { value: SurveyOftenConsumeCannabisEnum.Occassionally, label: 'Occassionally' },
  { value: SurveyOftenConsumeCannabisEnum.Rarely, label: 'Rarely' }
];

export const purposeSurvey = [
  { value: PrimaryPurposeEnum.MentalHealth, label: 'Mental Health' },
  { value: PrimaryPurposeEnum.PainRelief, label: 'Pain Relief' },
  { value: PrimaryPurposeEnum.Recreation, label: 'Recreation' }
];

export const flavorSurvey = [
  { value: SmokedEnum.Medium, label: 'Medium' },
  { value: SmokedEnum.Mild, label: 'Mild' },
  { value: SmokedEnum.Strong, label: 'Strong' }
];
export const experienceSurvey = [
  { value: ExperienceEnum.EuphoricCreative, label: 'Creative' },
  { value: ExperienceEnum.FugginStupid, label: 'Stupid' },
  { value: ExperienceEnum.HeadyMental, label: 'Heady' },
  { value: ExperienceEnum.RelaxingPainrelieving, label: 'Relaxing' }
];

export const stoneySurvey = [
  { value: IntoxicationEnum.Meh, label: 'Meh' },
  { value: IntoxicationEnum.Stoned, label: 'Stoned' },
  { value: IntoxicationEnum.Wrecked, label: 'Wrecled' }
];

export const appealingSurvey = [
  { value: AppealingVisuallyEnum.Fyre, label: 'Fyre' },
  { value: AppealingVisuallyEnum.Midz, label: 'Midz' },
  { value: AppealingVisuallyEnum.Low, label: 'Low' }
];

export const colorSurvey = [
  { value: ColorEnum.Green, label: 'Green' },
  { value: ColorEnum.Purple, label: 'Purple' },
  { value: ColorEnum.Yellow, label: 'Yellow' }
];

export const noseSurvey = [
  { value: NoseEnum.Large, label: 'Boom' },
  { value: NoseEnum.Medium, label: 'Moderate' },
  { value: NoseEnum.Small, label: 'Light' }
];
