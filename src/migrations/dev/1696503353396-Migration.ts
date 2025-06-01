import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696503353396 implements MigrationInterface {
  name = 'Migration1696503353396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "hire_date" character varying(24)`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "is_owner" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "is_manager" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "is_medical" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "is_retail" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "is_hemp" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "restrict_harvest_plant_restore_time_hours" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "total_member_patients_allowed" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "restrict_wholesale_price_edit_days" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "restrict_plant_batch_adjustment_time_hours" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_grow_plants" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_create_opening_balance_plant_batches" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_clone_plant_batches" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_tag_plant_batches" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "plants_require_patient_affiliation" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "plant_batches_can_contain_mother_plants" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_update_plant_strains" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_track_vegetative_plants" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_create_immature_plant_packages_from_plants" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_package_vegetative_plants" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_package_waste" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_report_harvest_schedules" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_submit_harvests_for_testing" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_require_harvest_sample_lab_test_batches" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_report_strain_properties" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_create_opening_balance_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_create_derived_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_assign_locations_to_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_update_locations_on_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "packages_require_patient_affiliation" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_create_trade_sample_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_donate_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_submit_packages_for_testing" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_create_process_validation_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_require_package_sample_lab_test_batches" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_request_product_remediation" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_remediate_packages_with_failed_lab_results" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_infuse_products" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_record_processing_jobs" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_record_product_for_destruction" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_destroy_product" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_test_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "tests_require_lab_sample" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_transfer_from_external_facilities" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_sell_to_consumers" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_sell_to_patients" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_sell_to_external_patients" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_sell_to_caregivers" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_take_plant_batches_on_trip" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_take_plants_on_trip" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_take_harvests_on_trip" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_take_packages_on_trip" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_sell_from_packages_on_trip" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "advanced_sales" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_require_patient_number" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_require_external_patient_number" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_require_external_patient_identification_method" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_require_caregiver_number" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_require_caregiver_patient_number" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_deliver_sales_to_consumers" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_allow_planned_route" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_allow_address" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_allow_city" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_allow_state" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_allow_county" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_allow_zip" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_require_consumer_id" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_deliver_sales_to_patients" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_require_patient_number" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "sales_delivery_require_recipient_name" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "is_sales_delivery_hub" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_have_member_patients" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_report_patient_check_ins" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_specify_patient_sales_limit_exemption" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_report_patients_adverse_responses" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "retailer_delivery" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "retailer_delivery_allow_trade_samples" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "retailer_delivery_allow_donations" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "retailer_delivery_require_price" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "retailer_delivery_allow_partial_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_create_partial_packages" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_adjust_source_packages_with_partials" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_report_operational_exceptions" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "can_report_adulteration" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_report_adulteration"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_report_operational_exceptions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_adjust_source_packages_with_partials"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_create_partial_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "retailer_delivery_allow_partial_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "retailer_delivery_require_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "retailer_delivery_allow_donations"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "retailer_delivery_allow_trade_samples"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "retailer_delivery"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_report_patients_adverse_responses"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_specify_patient_sales_limit_exemption"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_report_patient_check_ins"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_have_member_patients"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "is_sales_delivery_hub"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_require_recipient_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_require_patient_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_deliver_sales_to_patients"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_require_consumer_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_allow_zip"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_allow_county"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_allow_state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_allow_city"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_allow_address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_delivery_allow_planned_route"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_deliver_sales_to_consumers"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_require_caregiver_patient_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_require_caregiver_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_require_external_patient_identification_method"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_require_external_patient_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "sales_require_patient_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "advanced_sales"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_sell_from_packages_on_trip"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_take_packages_on_trip"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_take_harvests_on_trip"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_take_plants_on_trip"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_take_plant_batches_on_trip"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_sell_to_caregivers"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_sell_to_external_patients"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_sell_to_patients"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_sell_to_consumers"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_transfer_from_external_facilities"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "tests_require_lab_sample"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_test_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_destroy_product"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_record_product_for_destruction"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_record_processing_jobs"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_infuse_products"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_remediate_packages_with_failed_lab_results"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_request_product_remediation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_require_package_sample_lab_test_batches"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_create_process_validation_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_submit_packages_for_testing"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_donate_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_create_trade_sample_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "packages_require_patient_affiliation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_update_locations_on_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_assign_locations_to_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_create_derived_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_create_opening_balance_packages"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_report_strain_properties"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_require_harvest_sample_lab_test_batches"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_submit_harvests_for_testing"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_report_harvest_schedules"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_package_waste"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_package_vegetative_plants"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_create_immature_plant_packages_from_plants"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_track_vegetative_plants"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_update_plant_strains"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "plant_batches_can_contain_mother_plants"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "plants_require_patient_affiliation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_tag_plant_batches"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_clone_plant_batches"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_create_opening_balance_plant_batches"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "can_grow_plants"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "restrict_plant_batch_adjustment_time_hours"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "restrict_wholesale_price_edit_days"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "total_member_patients_allowed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "restrict_harvest_plant_restore_time_hours"`,
    );
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_hemp"`);
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_retail"`);
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_medical"`);
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_manager"`);
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_owner"`);
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "hire_date"`);
  }
}
