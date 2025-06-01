import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1698063376154 implements MigrationInterface {
  name = 'Migration1698063376154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."facility_role_enum" AS ENUM('buyer', 'cultivator')`,
    );
    await queryRunner.query(
      `CREATE TABLE "facility" ("id" character varying(48) NOT NULL, "name" character varying(255) NOT NULL, "alias" character varying(255), "display_name" character varying(255) NOT NULL, "description" text, "credentialed_date" date NOT NULL DEFAULT now(), "metrc_api_key" character varying(128) NOT NULL DEFAULT '', "hire_date" character varying(24), "is_owner" boolean NOT NULL DEFAULT false, "is_manager" boolean NOT NULL DEFAULT false, "role" "public"."facility_role_enum" NOT NULL DEFAULT 'buyer', "asset_id" integer, "user_contact_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, "license_number" character varying(48) NOT NULL, "license_start_date" date DEFAULT now(), "license_end_date" date DEFAULT now(), "license_type" character varying(64) NOT NULL, "is_medical" boolean NOT NULL DEFAULT false, "is_retail" boolean NOT NULL DEFAULT false, "is_hemp" boolean NOT NULL DEFAULT false, "restrict_harvest_plant_restore_time_hours" integer, "total_member_patients_allowed" integer, "restrict_wholesale_price_edit_days" integer, "restrict_plant_batch_adjustment_time_hours" integer, "can_grow_plants" boolean NOT NULL DEFAULT false, "can_create_opening_balance_plant_batches" boolean NOT NULL DEFAULT false, "can_clone_plant_batches" boolean NOT NULL DEFAULT false, "can_tag_plant_batches" boolean NOT NULL DEFAULT false, "plants_require_patient_affiliation" boolean NOT NULL DEFAULT false, "plant_batches_can_contain_mother_plants" boolean NOT NULL DEFAULT false, "can_update_plant_strains" boolean NOT NULL DEFAULT false, "can_track_vegetative_plants" boolean NOT NULL DEFAULT false, "can_create_immature_plant_packages_from_plants" boolean NOT NULL DEFAULT false, "can_package_vegetative_plants" boolean NOT NULL DEFAULT false, "can_package_waste" boolean NOT NULL DEFAULT false, "can_report_harvest_schedules" boolean NOT NULL DEFAULT false, "can_submit_harvests_for_testing" boolean NOT NULL DEFAULT false, "can_require_harvest_sample_lab_test_batches" boolean NOT NULL DEFAULT false, "can_report_strain_properties" boolean NOT NULL DEFAULT false, "can_create_opening_balance_packages" boolean NOT NULL DEFAULT false, "can_create_derived_packages" boolean NOT NULL DEFAULT false, "can_assign_locations_to_packages" boolean NOT NULL DEFAULT false, "can_update_locations_on_packages" boolean NOT NULL DEFAULT false, "packages_require_patient_affiliation" boolean NOT NULL DEFAULT false, "can_create_trade_sample_packages" boolean NOT NULL DEFAULT false, "can_donate_packages" boolean NOT NULL DEFAULT false, "can_submit_packages_for_testing" boolean NOT NULL DEFAULT false, "can_create_process_validation_packages" boolean NOT NULL DEFAULT false, "can_require_package_sample_lab_test_batches" boolean NOT NULL DEFAULT false, "can_request_product_remediation" boolean NOT NULL DEFAULT false, "can_remediate_packages_with_failed_lab_results" boolean NOT NULL DEFAULT false, "can_infuse_products" boolean NOT NULL DEFAULT false, "can_record_processing_jobs" boolean NOT NULL DEFAULT false, "can_record_product_for_destruction" boolean NOT NULL DEFAULT false, "can_destroy_product" boolean NOT NULL DEFAULT false, "can_test_packages" boolean NOT NULL DEFAULT false, "tests_require_lab_sample" boolean NOT NULL DEFAULT false, "can_transfer_from_external_facilities" boolean NOT NULL DEFAULT false, "can_sell_to_consumers" boolean NOT NULL DEFAULT false, "can_sell_to_patients" boolean NOT NULL DEFAULT false, "can_sell_to_external_patients" boolean NOT NULL DEFAULT false, "can_sell_to_caregivers" boolean NOT NULL DEFAULT false, "can_take_plant_batches_on_trip" boolean NOT NULL DEFAULT false, "can_take_plants_on_trip" boolean NOT NULL DEFAULT false, "can_take_harvests_on_trip" boolean NOT NULL DEFAULT false, "can_take_packages_on_trip" boolean NOT NULL DEFAULT false, "can_sell_from_packages_on_trip" boolean NOT NULL DEFAULT false, "advanced_sales" boolean NOT NULL DEFAULT false, "sales_require_patient_number" boolean NOT NULL DEFAULT false, "sales_require_external_patient_number" boolean NOT NULL DEFAULT false, "sales_require_external_patient_identification_method" boolean NOT NULL DEFAULT false, "sales_require_caregiver_number" boolean NOT NULL DEFAULT false, "sales_require_caregiver_patient_number" boolean NOT NULL DEFAULT false, "can_deliver_sales_to_consumers" boolean NOT NULL DEFAULT false, "sales_delivery_allow_planned_route" boolean NOT NULL DEFAULT false, "sales_delivery_allow_address" boolean NOT NULL DEFAULT false, "sales_delivery_allow_city" boolean NOT NULL DEFAULT false, "sales_delivery_allow_state" boolean NOT NULL DEFAULT false, "sales_delivery_allow_county" boolean NOT NULL DEFAULT false, "sales_delivery_allow_zip" boolean NOT NULL DEFAULT false, "sales_delivery_require_consumer_id" boolean NOT NULL DEFAULT false, "can_deliver_sales_to_patients" boolean NOT NULL DEFAULT false, "sales_delivery_require_patient_number" boolean NOT NULL DEFAULT false, "sales_delivery_require_recipient_name" boolean NOT NULL DEFAULT false, "is_sales_delivery_hub" boolean NOT NULL DEFAULT false, "can_have_member_patients" boolean NOT NULL DEFAULT false, "can_report_patient_check_ins" boolean NOT NULL DEFAULT false, "can_specify_patient_sales_limit_exemption" boolean NOT NULL DEFAULT false, "can_report_patients_adverse_responses" boolean NOT NULL DEFAULT false, "retailer_delivery" boolean NOT NULL DEFAULT false, "retailer_delivery_allow_trade_samples" boolean NOT NULL DEFAULT false, "retailer_delivery_allow_donations" boolean NOT NULL DEFAULT false, "retailer_delivery_require_price" boolean NOT NULL DEFAULT false, "retailer_delivery_allow_partial_packages" boolean NOT NULL DEFAULT false, "can_create_partial_packages" boolean NOT NULL DEFAULT false, "can_adjust_source_packages_with_partials" boolean NOT NULL DEFAULT false, "can_report_operational_exceptions" boolean NOT NULL DEFAULT false, "can_report_adulteration" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_quantity_type_enum" AS ENUM('CountBased', 'WeightBased')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_default_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_cbd_content_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_thc_content_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_volume_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_thc_content_dose_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_weight_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_quantity_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" integer NOT NULL, "name" character varying NOT NULL, "product_category_name" character varying NOT NULL, "product_category_type" character varying NOT NULL, "is_expiration_date_required" boolean NOT NULL DEFAULT false, "is_sell_by_date_required" boolean NOT NULL DEFAULT false, "is_use_by_date_required" boolean NOT NULL DEFAULT false, "quantity_type" "public"."item_quantity_type_enum", "default_lab_testing_state" "public"."item_default_lab_testing_state_enum", "unit_of_measure_name" "public"."item_unit_of_measure_name_enum", "approval_status" character varying, "approval_status_date_time" TIMESTAMP WITH TIME ZONE, "strain_id" integer, "strain_name" character varying, "brand_name" character varying, "administration_method" character varying, "unit_cbd_percent" numeric, "unit_cbd_content" numeric, "unit_cbd_content_unit_of_measure_name" "public"."item_unit_cbd_content_unit_of_measure_name_enum", "unit_thc_percent" numeric, "unit_thc_content" numeric, "unit_thc_content_unit_of_measure_name" "public"."item_unit_thc_content_unit_of_measure_name_enum", "unit_volume" numeric, "unit_volume_unit_of_measure_name" "public"."item_unit_volume_unit_of_measure_name_enum", "unit_cbd_content_dose" numeric, "unit_cbd_content_dose_unit_of_measure_name" "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum", "unit_thc_content_dose" numeric, "unit_thc_content_dose_unit_of_measure_name" "public"."item_unit_thc_content_dose_unit_of_measure_name_enum", "unit_weight" numeric, "unit_weight_unit_of_measure_name" "public"."item_unit_weight_unit_of_measure_name_enum", "serving_size" character varying, "supply_duration_days" integer, "number_of_doses" integer, "unit_quantity" numeric, "unit_quantity_unit_of_measure_name" "public"."item_unit_quantity_unit_of_measure_name_enum", "public_ingredients" text, "description" text, "product_images" jsonb, "label_images" jsonb, "packaging_images" jsonb, "is_used" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_status_enum" AS ENUM('new', 'listed', 'unlisted', 'archived')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_package_type_enum" AS ENUM('Product', 'ImmaturePlant', 'VegetativePlant', 'PlantWaste', 'HarvestWaste')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_unit_of_measure_abbreviation_enum" AS ENUM('ea', 'oz', 'lb', 'g', 'mg', 'kg', 't')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_initial_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "description" text, "status" "public"."product_status_enum" NOT NULL DEFAULT 'new', "quantity" numeric(5,2) NOT NULL DEFAULT '0', "quantity_stock_min" numeric(5,2) NOT NULL DEFAULT '0', "quantity_stock" numeric(5,2) NOT NULL DEFAULT '0', "label" character varying NOT NULL, "package_type" "public"."product_package_type_enum", "source_harvest_count" integer NOT NULL DEFAULT '0', "source_package_count" integer NOT NULL DEFAULT '0', "source_processing_job_count" integer NOT NULL DEFAULT '0', "location_id" integer, "location_name" character varying, "location_type_name" character varying, "unit_of_measure_name" "public"."product_unit_of_measure_name_enum", "unit_of_measure_abbreviation" "public"."product_unit_of_measure_abbreviation_enum", "packaged_date" date NOT NULL, "initial_lab_testing_state" "public"."product_initial_lab_testing_state_enum", "lab_testing_state" "public"."product_lab_testing_state_enum", "lab_testing_state_date" date NOT NULL, "is_on_hold" boolean NOT NULL DEFAULT false, "is_on_trip" boolean NOT NULL DEFAULT false, "is_on_retailer_delivery" boolean NOT NULL DEFAULT false, "last_modified" TIMESTAMP WITH TIME ZONE NOT NULL, "facility_id" character varying(48), "item_id" integer NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_type_enum" AS ENUM('image', 'logo')`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset" ("id" SERIAL NOT NULL, "type" "public"."asset_type_enum" NOT NULL DEFAULT 'logo', "hashname" character varying(100) NOT NULL, "filename" character varying(150) NOT NULL, "mimetype" character varying(100) NOT NULL, "path" character varying(255) NOT NULL, "size" integer NOT NULL DEFAULT '0', "width" integer NOT NULL DEFAULT '0', "height" integer NOT NULL DEFAULT '0', "product_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ac8a52a96c145ccc9862ef50e7" ON "asset" ("id", "hashname") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('employee', 'admin', 'owner', 'admin_platform', 'owner_platform')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying(48) NOT NULL, "fullname" character varying(255) NOT NULL, "email" character varying(255), "is_blocked" boolean NOT NULL DEFAULT false, "is_kyc" boolean NOT NULL DEFAULT false, "public_address" character varying(128), "issuer" character varying(128), "phone_number" character varying(24), "role" "public"."user_role_enum" NOT NULL DEFAULT 'employee', "asset_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, "license_number" character varying(48) NOT NULL, "license_start_date" date DEFAULT now(), "license_end_date" date DEFAULT now(), "license_type" character varying(64) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."invite_type_enum" AS ENUM('buyer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "invite" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL DEFAULT '', "type" "public"."invite_type_enum" NOT NULL, "is_activated" boolean NOT NULL DEFAULT false, "code" character varying(20), "phone" character varying(24) NOT NULL, "facility_id" character varying(48), "relation_facility_id" character varying(48), "owner_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facility_to_facility" ("facility_id" character varying(48) NOT NULL, "facility_rel_id" character varying(48) NOT NULL, CONSTRAINT "PK_261be7c54180a7e40cd7609f3bf" PRIMARY KEY ("facility_id", "facility_rel_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0a7dd778eaeee9c6e7186a17e" ON "facility_to_facility" ("facility_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f1749803f00eed29736dbc27c" ON "facility_to_facility" ("facility_rel_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_to_facilities" ("user_id" character varying(48) NOT NULL, "facility_id" character varying(48) NOT NULL, CONSTRAINT "PK_d18a6c052c34da34c81612e6f72" PRIMARY KEY ("user_id", "facility_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe3e233a3057f433fa0eff473c" ON "user_to_facilities" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2f46d93cec492d987e88e066f9" ON "user_to_facilities" ("facility_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD CONSTRAINT "FK_c366539aa87e3409918f09bedb7" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD CONSTRAINT "FK_9fed65f0d0be127919394286027" FOREIGN KEY ("user_contact_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_64785df36f923563795d325d68e" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_83c3b7a80f6fe1d5ad7fa05a2a2" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD CONSTRAINT "FK_980f83643b37cdae0d37df0c3e8" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e21f8c1180fa83c07e5399ecb04" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_0d1c8d3a6602c6afdd9c016b04d" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_8a2aee0306b23d1a037fe20f749" FOREIGN KEY ("relation_facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_267ec7b773607be6949152c583b" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_9f1749803f00eed29736dbc27c8" FOREIGN KEY ("facility_rel_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_2f46d93cec492d987e88e066f96" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_2f46d93cec492d987e88e066f96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "FK_9f1749803f00eed29736dbc27c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_267ec7b773607be6949152c583b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_8a2aee0306b23d1a037fe20f749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_0d1c8d3a6602c6afdd9c016b04d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e21f8c1180fa83c07e5399ecb04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP CONSTRAINT "FK_980f83643b37cdae0d37df0c3e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_83c3b7a80f6fe1d5ad7fa05a2a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_64785df36f923563795d325d68e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP CONSTRAINT "FK_9fed65f0d0be127919394286027"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP CONSTRAINT "FK_c366539aa87e3409918f09bedb7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2f46d93cec492d987e88e066f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe3e233a3057f433fa0eff473c"`,
    );
    await queryRunner.query(`DROP TABLE "user_to_facilities"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f1749803f00eed29736dbc27c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0a7dd778eaeee9c6e7186a17e"`,
    );
    await queryRunner.query(`DROP TABLE "facility_to_facility"`);
    await queryRunner.query(`DROP TABLE "invite"`);
    await queryRunner.query(`DROP TYPE "public"."invite_type_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ac8a52a96c145ccc9862ef50e7"`,
    );
    await queryRunner.query(`DROP TABLE "asset"`);
    await queryRunner.query(`DROP TYPE "public"."asset_type_enum"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(
      `DROP TYPE "public"."product_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_initial_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_unit_of_measure_abbreviation_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."product_package_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_quantity_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_weight_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_thc_content_dose_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_volume_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_thc_content_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_cbd_content_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_default_lab_testing_state_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."item_quantity_type_enum"`);
    await queryRunner.query(`DROP TABLE "facility"`);
    await queryRunner.query(`DROP TYPE "public"."facility_role_enum"`);
  }
}
