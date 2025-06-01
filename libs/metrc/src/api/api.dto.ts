export class HarvestsResuestDTO {
  id: string;
  licenseNumber?: string;
}

export class MetrcFacility {
  name: string;

  alias?: string;

  displayName: string;

  license: MetrcLicense;

  credentialedDate?: string;

  hireDate?: string;

  isOwner?: boolean;

  isManager?: boolean;

  occupations?: string[];

  supportActivationDate?: string;

  supportExpirationDate?: string;

  supportLastPaidDate?: string;

  facilityType?: MetrcFacilityType;

  role?: any;
}
export class MetrcFacilityType {
  isMedical: boolean | false;
  isRetail: boolean | false;
  isHemp: boolean | false;
  restrictHarvestPlantRestoreTimeHours: number | 0;
  totalMemberPatientsAllowed: number | null;
  restrictWholesalePriceEditDays: number | null;
  restrictPlantBatchAdjustmentTimeHours: number | null;
  canGrowPlants: boolean | false;
  canCreateOpeningBalancePlantBatches: boolean | false;
  canClonePlantBatches: boolean | false;
  canTagPlantBatches: boolean | false;
  canAssignLocationsToPlantBatches: boolean | false;
  plantsRequirePatientAffiliation: boolean | false;
  plantBatchesCanContainMotherPlants: boolean | false;
  canUpdatePlantStrains: boolean | false;
  canTrackVegetativePlants: boolean | false;
  canCreateImmaturePlantPackagesFromPlants: boolean | false;
  canPackageVegetativePlants: boolean | false;
  canPackageWaste: boolean | false;
  canReportHarvestSchedules: boolean | false;
  canSubmitHarvestsForTesting: boolean | false;
  canRequireHarvestSampleLabTestBatches: boolean | false;
  canReportStrainProperties: boolean | false;
  canCreateOpeningBalancePackages: boolean | false;
  canCreateDerivedPackages: boolean | false;
  canAssignLocationsToPackages: boolean | false;
  canUpdateLocationsOnPackages: boolean | false;
  packagesRequirePatientAffiliation: boolean | false;
  canCreateTradeSamplePackages: boolean | false;
  canDonatePackages: boolean | false;
  canSubmitPackagesForTesting: boolean | false;
  canCreateProcessValidationPackages: boolean | false;
  canRequirePackageSampleLabTestBatches: boolean | false;
  canRequestProductRemediation: boolean | false;
  canRemediatePackagesWithFailedLabResults: boolean | false;
  canInfuseProducts: boolean | false;
  canRecordProcessingJobs: boolean | false;
  canRecordProductForDestruction: boolean | false;
  canDestroyProduct: boolean | false;
  canTestPackages: boolean | false;
  testsRequireLabSample: boolean | false;
  canTransferFromExternalFacilities: boolean | false;
  canSellToConsumers: boolean | false;
  canSellToPatients: boolean | false;
  canSellToExternalPatients: boolean | false;
  canSellToCaregivers: boolean | false;
  canTakePlantBatchesOnTrip: boolean | false;
  canTakePlantsOnTrip: boolean | false;
  canTakeHarvestsOnTrip: boolean | false;
  canTakePackagesOnTrip: boolean | false;
  canSellFromPackagesOnTrip: boolean | false;
  advancedSales: boolean | false;
  salesRequirePatientNumber: boolean | false;
  salesRequireExternalPatientNumber: boolean | false;
  salesRequireExternalPatientIdentificationMethod: boolean | false;
  salesRequireCaregiverNumber: boolean | false;
  salesRequireCaregiverPatientNumber: boolean | false;
  canDeliverSalesToConsumers: boolean | false;
  salesDeliveryAllowPlannedRoute: boolean | false;
  salesDeliveryAllowAddress: boolean | false;
  salesDeliveryAllowCity: boolean | false;
  salesDeliveryAllowState: boolean | false;
  salesDeliveryAllowCounty: boolean | false;
  salesDeliveryAllowZip: boolean | false;
  salesDeliveryRequireConsumerId: boolean | false;
  canDeliverSalesToPatients: boolean | false;
  salesDeliveryRequirePatientNumber: boolean | false;
  salesDeliveryRequireRecipientName: boolean | false;
  isSalesDeliveryHub: boolean | false;
  canHaveMemberPatients: boolean | false;
  canReportPatientCheckIns: boolean | false;
  canSpecifyPatientSalesLimitExemption: boolean | false;
  canReportPatientsAdverseResponses: boolean | false;
  retailerDelivery: boolean | false;
  retailerDeliveryAllowTradeSamples: boolean | false;
  retailerDeliveryAllowDonations: boolean | false;
  retailerDeliveryRequirePrice: boolean | false;
  retailerDeliveryAllowPartialPackages: boolean | false;
  canCreatePartialPackages: boolean | false;
  canAdjustSourcePackagesWithPartials: boolean | false;
  canReportOperationalExceptions: boolean | false;
  canReportAdulteration: boolean | false;
}

export class MetrcEmployee {
  id: number;

  fullName: string;

  license: MetrcLicense;
}

export class MetrcEmployees {
  total: number;
  pageSize: number;
  page: number;
  totalPages: number;
  data: MetrcEmployee[];
}

export class MetrcLicense {
  number: string;
  startDate: string;
  endDate: string;
  licenseType: string;
}

export class MetrcPackage {
  id: number;
  label: string;
  packageType: string;
  sourceHarvestCount: number;
  sourcePackageCount: number;
  sourceProcessingJobCount: number;
  sourcePackageLabels?: string;
  locationId?: number;
  locationName?: string;
  locationTypeName?: string;
  quantity: number;
  unitOfMeasureName?: string;
  unitOfMeasureAbbreviation?: string;
  packagedDate: string;
  initialLabTestingState: string;
  labTestingState: string;
  labTestingStateDate: string;
  isOnHold: boolean;
  isOnTrip: boolean;
  isOnRetailerDelivery: boolean;
  lastModified: Date;
  item: MetrcItem;
}

export class MetrcPackages {
  total: number;
  pageSize: number;
  page: number;
  totalPages: number;
  data: MetrcPackage[];
}

export class MetrcItem {
  id: number;
  name: string;
  productCategoryName: string;
  productCategoryType: string;
  isExpirationDateRequired: boolean;
  isSellByDateRequired: boolean;
  isUseByDateRequired: boolean;
  quantityType: string;
  defaultLabTestingState: string;
  unitOfMeasureName: string;
  approvalStatus: string;
  approvalStatusDateTime: string;
  strainId: number | null;
  strainName: string | null;
  itemBrandId: number;
  itemBrandName: string | null;
  administrationMethod: string;
  unitCbdPercent: number | null;
  unitCbdContent: number | null;
  unitCbdContentUnitOfMeasureName: string | null;
  unitCbdContentDose: number | null;
  unitCbdContentDoseUnitOfMeasureName: string | null;
  unitThcPercent: number | null;
  unitThcContent: number | null;
  unitThcContentUnitOfMeasureName: string | null;
  unitThcContentDose: number | null;
  unitThcContentDoseUnitOfMeasureName: string | null;
  unitVolume: number | null;
  unitVolumeUnitOfMeasureName: string | null;
  unitWeight: number;
  unitWeightUnitOfMeasureName: string;
  servingSize: string;
  supplyDurationDays: number | null;
  numberOfDoses: number | null;
  unitQuantity: number | null;
  unitQuantityUnitOfMeasureName: string | null;
  publicIngredients: string;
  description: string;
  productImages: any[];
  labelImages: any[];
  packagingImages: any[];
  isUsed: boolean;
}

export class MetrcItems {
  total: number;
  pageSize: number;
  page: number;
  totalPages: number;
  data: MetrcItem[];
}
