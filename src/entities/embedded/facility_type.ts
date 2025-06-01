import { Field, ObjectType } from '@nestjs/graphql';
import { MetrcFacilityType } from 'libs/metrc/src/api/api.dto';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true, description: 'FacilityType' })
export class FacilityType extends MetrcFacilityType {
  @Field(() => Boolean, {
    nullable: false,
    description: 'IsMedical flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'is_medical',
    default: false,
    nullable: false,
  })
  isMedical: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'IsRetail flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'is_retail',
    default: false,
    nullable: false,
  })
  isRetail: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'IsHemp flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'is_hemp',
    default: false,
    nullable: false,
  })
  isHemp: boolean;

  @Field(() => Number, {
    nullable: true,
    description: 'RestrictHarvestPlantRestoreTimeHours flag facilityType',
  })
  @Column({
    type: 'integer',
    name: 'restrict_harvest_plant_restore_time_hours',
    nullable: true,
  })
  restrictHarvestPlantRestoreTimeHours: number | null;

  @Field(() => Number, {
    nullable: true,
    description: 'TotalMemberPatientsAllowed flag facilityType',
  })
  @Column({
    type: 'integer',
    name: 'total_member_patients_allowed',
    nullable: true,
  })
  totalMemberPatientsAllowed: number | null;

  @Field(() => Number, {
    nullable: true,
    description: 'RestrictWholesalePriceEditDays flag facilityType',
  })
  @Column({
    type: 'integer',
    name: 'restrict_wholesale_price_edit_days',
    nullable: true,
  })
  restrictWholesalePriceEditDays: number | null;

  @Field(() => Number, {
    nullable: true,
    description: 'RestrictPlantBatchAdjustmentTimeHours flag facilityType',
  })
  @Column({
    type: 'integer',
    name: 'restrict_plant_batch_adjustment_time_hours',
    nullable: true,
  })
  restrictPlantBatchAdjustmentTimeHours: number | null;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanGrowPlants flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_grow_plants',
    default: false,
    nullable: false,
  })
  canGrowPlants: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanCreateOpeningBalancePlantBatches flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_create_opening_balance_plant_batches',
    default: false,
    nullable: false,
  })
  canCreateOpeningBalancePlantBatches: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanClonePlantBatches flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_clone_plant_batches',
    default: false,
    nullable: false,
  })
  canClonePlantBatches: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanTagPlantBatches flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_tag_plant_batches',
    default: false,
    nullable: false,
  })
  canTagPlantBatches: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'PlantsRequirePatientAffiliation flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'plants_require_patient_affiliation',
    default: false,
    nullable: false,
  })
  plantsRequirePatientAffiliation: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'PlantBatchesCanContainMotherPlants flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'plant_batches_can_contain_mother_plants',
    default: false,
    nullable: false,
  })
  plantBatchesCanContainMotherPlants: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanUpdatePlantStrains flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_update_plant_strains',
    default: false,
    nullable: false,
  })
  canUpdatePlantStrains: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanTrackVegetativePlants flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_track_vegetative_plants',
    default: false,
    nullable: false,
  })
  canTrackVegetativePlants: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanCreateImmaturePlantPackagesFromPlants flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_create_immature_plant_packages_from_plants',
    default: false,
    nullable: false,
  })
  canCreateImmaturePlantPackagesFromPlants: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanPackageVegetativePlants flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_package_vegetative_plants',
    default: false,
    nullable: false,
  })
  canPackageVegetativePlants: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanPackageWaste flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_package_waste',
    default: false,
    nullable: false,
  })
  canPackageWaste: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanReportHarvestSchedules flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_report_harvest_schedules',
    default: false,
    nullable: false,
  })
  canReportHarvestSchedules: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanSubmitHarvestsForTesting flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_submit_harvests_for_testing',
    default: false,
    nullable: false,
  })
  canSubmitHarvestsForTesting: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanRequireHarvestSampleLabTestBatches flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_require_harvest_sample_lab_test_batches',
    default: false,
    nullable: false,
  })
  canRequireHarvestSampleLabTestBatches: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanReportStrainProperties flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_report_strain_properties',
    default: false,
    nullable: false,
  })
  canReportStrainProperties: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanCreateOpeningBalancePackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_create_opening_balance_packages',
    default: false,
    nullable: false,
  })
  canCreateOpeningBalancePackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanCreateDerivedPackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_create_derived_packages',
    default: false,
    nullable: false,
  })
  canCreateDerivedPackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanAssignLocationsToPackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_assign_locations_to_packages',
    default: false,
    nullable: false,
  })
  canAssignLocationsToPackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanUpdateLocationsOnPackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_update_locations_on_packages',
    default: false,
    nullable: false,
  })
  canUpdateLocationsOnPackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'PackagesRequirePatientAffiliation flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'packages_require_patient_affiliation',
    default: false,
    nullable: false,
  })
  packagesRequirePatientAffiliation: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanCreateTradeSamplePackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_create_trade_sample_packages',
    default: false,
    nullable: false,
  })
  canCreateTradeSamplePackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanDonatePackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_donate_packages',
    default: false,
    nullable: false,
  })
  canDonatePackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanSubmitPackagesForTesting flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_submit_packages_for_testing',
    default: false,
    nullable: false,
  })
  canSubmitPackagesForTesting: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanCreateProcessValidationPackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_create_process_validation_packages',
    default: false,
    nullable: false,
  })
  canCreateProcessValidationPackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanRequirePackageSampleLabTestBatches flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_require_package_sample_lab_test_batches',
    default: false,
    nullable: false,
  })
  canRequirePackageSampleLabTestBatches: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanRequestProductRemediation flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_request_product_remediation',
    default: false,
    nullable: false,
  })
  canRequestProductRemediation: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanRemediatePackagesWithFailedLabResults flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_remediate_packages_with_failed_lab_results',
    default: false,
    nullable: false,
  })
  canRemediatePackagesWithFailedLabResults: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanInfuseProducts flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_infuse_products',
    default: false,
    nullable: false,
  })
  canInfuseProducts: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanRecordProcessingJobs flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_record_processing_jobs',
    default: false,
    nullable: false,
  })
  canRecordProcessingJobs: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanRecordProductForDestruction flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_record_product_for_destruction',
    default: false,
    nullable: false,
  })
  canRecordProductForDestruction: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanDestroyProduct flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_destroy_product',
    default: false,
    nullable: false,
  })
  canDestroyProduct: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanTestPackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_test_packages',
    default: false,
    nullable: false,
  })
  canTestPackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'TestsRequireLabSample flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'tests_require_lab_sample',
    default: false,
    nullable: false,
  })
  testsRequireLabSample: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanTransferFromExternalFacilities flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_transfer_from_external_facilities',
    default: false,
    nullable: false,
  })
  canTransferFromExternalFacilities: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanSellToConsumers flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_sell_to_consumers',
    default: false,
    nullable: false,
  })
  canSellToConsumers: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanSellToPatients flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_sell_to_patients',
    default: false,
    nullable: false,
  })
  canSellToPatients: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanSellToExternalPatients flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_sell_to_external_patients',
    default: false,
    nullable: false,
  })
  canSellToExternalPatients: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanSellToCaregivers flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_sell_to_caregivers',
    default: false,
    nullable: false,
  })
  canSellToCaregivers: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanTakePlantBatchesOnTrip flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_take_plant_batches_on_trip',
    default: false,
    nullable: false,
  })
  canTakePlantBatchesOnTrip: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanTakePlantsOnTrip flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_take_plants_on_trip',
    default: false,
    nullable: false,
  })
  canTakePlantsOnTrip: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanTakeHarvestsOnTrip flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_take_harvests_on_trip',
    default: false,
    nullable: false,
  })
  canTakeHarvestsOnTrip: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanTakePackagesOnTrip flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_take_packages_on_trip',
    default: false,
    nullable: false,
  })
  canTakePackagesOnTrip: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanSellFromPackagesOnTrip flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_sell_from_packages_on_trip',
    default: false,
    nullable: false,
  })
  canSellFromPackagesOnTrip: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'AdvancedSales flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'advanced_sales',
    default: false,
    nullable: false,
  })
  advancedSales: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesRequirePatientNumber flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_require_patient_number',
    default: false,
    nullable: false,
  })
  salesRequirePatientNumber: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesRequireExternalPatientNumber flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_require_external_patient_number',
    default: false,
    nullable: false,
  })
  salesRequireExternalPatientNumber: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description:
      'SalesRequireExternalPatientIdentificationMethod flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_require_external_patient_identification_method',
    default: false,
    nullable: false,
  })
  salesRequireExternalPatientIdentificationMethod: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesRequireCaregiverNumber flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_require_caregiver_number',
    default: false,
    nullable: false,
  })
  salesRequireCaregiverNumber: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesRequireCaregiverPatientNumber flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_require_caregiver_patient_number',
    default: false,
    nullable: false,
  })
  salesRequireCaregiverPatientNumber: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanDeliverSalesToConsumers flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_deliver_sales_to_consumers',
    default: false,
    nullable: false,
  })
  canDeliverSalesToConsumers: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryAllowPlannedRoute flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_allow_planned_route',
    default: false,
    nullable: false,
  })
  salesDeliveryAllowPlannedRoute: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryAllowAddress flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_allow_address',
    default: false,
    nullable: false,
  })
  salesDeliveryAllowAddress: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryAllowCity flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_allow_city',
    default: false,
    nullable: false,
  })
  salesDeliveryAllowCity: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryAllowState flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_allow_state',
    default: false,
    nullable: false,
  })
  salesDeliveryAllowState: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryAllowCounty flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_allow_county',
    default: false,
    nullable: false,
  })
  salesDeliveryAllowCounty: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryAllowZip flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_allow_zip',
    default: false,
    nullable: false,
  })
  salesDeliveryAllowZip: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryRequireConsumerId flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_require_consumer_id',
    default: false,
    nullable: false,
  })
  salesDeliveryRequireConsumerId: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanDeliverSalesToPatients flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_deliver_sales_to_patients',
    default: false,
    nullable: false,
  })
  canDeliverSalesToPatients: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryRequirePatientNumber flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_require_patient_number',
    default: false,
    nullable: false,
  })
  salesDeliveryRequirePatientNumber: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'SalesDeliveryRequireRecipientName flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'sales_delivery_require_recipient_name',
    default: false,
    nullable: false,
  })
  salesDeliveryRequireRecipientName: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'IsSalesDeliveryHub flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'is_sales_delivery_hub',
    default: false,
    nullable: false,
  })
  isSalesDeliveryHub: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanHaveMemberPatients flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_have_member_patients',
    default: false,
    nullable: false,
  })
  canHaveMemberPatients: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanReportPatientCheckIns flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_report_patient_check_ins',
    default: false,
    nullable: false,
  })
  canReportPatientCheckIns: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanSpecifyPatientSalesLimitExemption flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_specify_patient_sales_limit_exemption',
    default: false,
    nullable: false,
  })
  canSpecifyPatientSalesLimitExemption: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanReportPatientsAdverseResponses flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_report_patients_adverse_responses',
    default: false,
    nullable: false,
  })
  canReportPatientsAdverseResponses: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'RetailerDelivery flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'retailer_delivery',
    default: false,
    nullable: false,
  })
  retailerDelivery: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'RetailerDeliveryAllowTradeSamples flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'retailer_delivery_allow_trade_samples',
    default: false,
    nullable: false,
  })
  retailerDeliveryAllowTradeSamples: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'RetailerDeliveryAllowDonations flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'retailer_delivery_allow_donations',
    default: false,
    nullable: false,
  })
  retailerDeliveryAllowDonations: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'RetailerDeliveryRequirePrice flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'retailer_delivery_require_price',
    default: false,
    nullable: false,
  })
  retailerDeliveryRequirePrice: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'RetailerDeliveryAllowPartialPackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'retailer_delivery_allow_partial_packages',
    default: false,
    nullable: false,
  })
  retailerDeliveryAllowPartialPackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanCreatePartialPackages flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_create_partial_packages',
    default: false,
    nullable: false,
  })
  canCreatePartialPackages: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanAdjustSourcePackagesWithPartials flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_adjust_source_packages_with_partials',
    default: false,
    nullable: false,
  })
  canAdjustSourcePackagesWithPartials: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanReportOperationalExceptions flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_report_operational_exceptions',
    default: false,
    nullable: false,
  })
  canReportOperationalExceptions: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'CanReportAdulteration flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'can_report_adulteration',
    default: false,
    nullable: false,
  })
  canReportAdulteration: boolean;
}
