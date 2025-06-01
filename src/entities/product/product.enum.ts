import { registerEnumType } from '@nestjs/graphql';

export enum ProductStatusEnum {
  new = 'new',
  listed = 'listed',
  unlisted = 'unlisted',
  archived = 'archived',
}

export enum LabTestingEnum {
  NotSubmitted = 'NotSubmitted',
  SubmittedForTesting = 'SubmittedForTesting',
  TestFailed = 'TestFailed',
  TestPassed = 'TestPassed',
  TestingInProgress = 'TestingInProgress',
  AwaitingConfirmation = 'AwaitingConfirmation',
  RetestFailed = 'RetestFailed',
  RetestPassed = 'RetestPassed',
  Remediated = 'Remediated',
  SelectedForRandomTesting = 'SelectedForRandomTesting',
  NotRequired = 'NotRequired',
  ProcessValidated = 'ProcessValidated',
}

export enum PackageTypeEnum {
  Product = 'Product',
  ImmaturePlant = 'ImmaturePlant',
  VegetativePlant = 'VegetativePlant',
  PlantWaste = 'PlantWaste',
  HarvestWaste = 'HarvestWaste',
}

export enum UnitsOfMeasureQuantityTypeEnum {
  CountBased = 'CountBased',
  WeightBased = 'WeightBased',
}

export enum UnitsOfMeasureNameEnum {
  Each = 'Each',
  Ounces = 'Ounces',
  Pounds = 'Pounds',
  Grams = 'Grams',
  Milligrams = 'Milligrams',
  Kilograms = 'Kilograms',
  Tonns = 'Tonns',
}

export enum UnitsOfMeasureAbbreviationEnum {
  ea = 'ea',
  oz = 'oz',
  lb = 'lb',
  g = 'g',
  mg = 'mg',
  kg = 'kg',
  t = 't',
}

registerEnumType(ProductStatusEnum, { name: 'ProductStatusEnum' });
registerEnumType(PackageTypeEnum, { name: 'PackageTypeEnum' });
registerEnumType(LabTestingEnum, { name: 'LabTestingEnum' });

registerEnumType(UnitsOfMeasureQuantityTypeEnum, {
  name: 'UnitsOfMeasureQuantityTypeEnum',
});
registerEnumType(UnitsOfMeasureNameEnum, { name: 'UnitsOfMeasureNameEnum' });
registerEnumType(UnitsOfMeasureAbbreviationEnum, {
  name: 'UnitsOfMeasureAbbreviationEnum',
});
