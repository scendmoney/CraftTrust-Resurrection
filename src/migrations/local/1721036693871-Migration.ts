import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721036693871 implements MigrationInterface {
    name = 'Migration1721036693871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "facility_to_facility" ("id" SERIAL NOT NULL, "total" integer NOT NULL DEFAULT '0', "last_order_date" TIMESTAMP WITH TIME ZONE, "order_total_spend" numeric(10,2) NOT NULL DEFAULT '0', "avg_purchase" numeric(10,2) NOT NULL DEFAULT '0', "is_net_activated" boolean NOT NULL DEFAULT false, "net_days" integer NOT NULL DEFAULT '0', "net_balance" integer NOT NULL DEFAULT '0', "due_balance" numeric(10,2) NOT NULL DEFAULT '0', "chat_sid" character varying(255), "is_message_buyer" boolean NOT NULL DEFAULT false, "is_message_cultivator" boolean NOT NULL DEFAULT false, "date_message_buyer" TIMESTAMP WITH TIME ZONE, "date_message_cultivator" TIMESTAMP WITH TIME ZONE, "facility_id" character varying(48) NOT NULL, "facility_rel_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_6e8216944047fb135701dc63ab8" PRIMARY KEY ("id")); COMMENT ON COLUMN "facility_to_facility"."chat_sid" IS 'Chat sid (twilio)'`);
        await queryRunner.query(`CREATE TABLE "order_product" ("id" SERIAL NOT NULL, "quantity" numeric(5,2) NOT NULL DEFAULT '0', "price" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(15,2) NOT NULL, "order_id" integer NOT NULL, "product_id" integer, "parent_product_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id")); COMMENT ON COLUMN "order_product"."total" IS 'total'`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('New', 'Confirmed', 'WaitingForPickUp', 'WaitingForCarrier', 'Shipped', 'Completed', 'Cancel')`);
        await queryRunner.query(`CREATE TYPE "public"."order_shipping_type_enum" AS ENUM('PickUp', 'Delivery')`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_type_enum" AS ENUM('PayNow', 'PayOnDelivery', 'Net')`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_status_enum" AS ENUM('NotPaid', 'Paid', 'Due', 'Overdue')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "total" numeric(10,2) NOT NULL DEFAULT '0', "total_buyer" numeric(10,2) NOT NULL DEFAULT '0', "total_cultivator" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."order_status_enum" NOT NULL, "shipping_type" "public"."order_shipping_type_enum" NOT NULL, "payment_type" "public"."order_payment_type_enum" NOT NULL, "payment_status" "public"."order_payment_status_enum" NOT NULL DEFAULT 'NotPaid', "payment_date" TIMESTAMP WITH TIME ZONE, "phone" character varying(20), "zip" integer, "address" character varying, "city" character varying, "ipfs" character varying, "comments" character varying, "verification_code" integer, "contact_person_id" character varying(48), "facility_buyer_id" character varying(48) NOT NULL, "facility_cultivator_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, "fee_buyer" numeric(10,2) NOT NULL DEFAULT '0', "fee_cultivator" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")); COMMENT ON COLUMN "order"."address" IS 'address'`);
        await queryRunner.query(`CREATE INDEX "IDX_5ce0ee80ac95c2bf7c4f23f98c" ON "order" ("facility_cultivator_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc635c4c3e886187fad43e328d" ON "order" ("facility_buyer_id") `);
        await queryRunner.query(`CREATE TYPE "public"."transaction_blockchain_status_enum" AS ENUM('done', 'error')`);
        await queryRunner.query(`CREATE TABLE "transaction_blockchain" ("id" SERIAL NOT NULL, "status" "public"."transaction_blockchain_status_enum" NOT NULL, "gas_limit" integer NOT NULL DEFAULT '0', "gas_used" integer NOT NULL DEFAULT '0', "fee_hbar" numeric(20,10) NOT NULL DEFAULT '0', "fee" numeric(20,10) NOT NULL DEFAULT '0', "transaction_blockchain_id" character varying(100), "error" character varying, "error_code" integer, "order_id" integer, "transaction_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f10200cb74897cf8be64a018f7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_status_enum" AS ENUM('cancel', 'done', 'error', 'new', 'processing')`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('buy', 'deposit', 'swap', 'withdrawal')`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_diamondstandard_status_enum" AS ENUM('QUOTE', 'REQUEST_INITIATED', 'INVALID_REQUEST', 'CARAT_TRANSFER_INITIATED', 'CARAT_TRANSFER_COMPLETED', 'CARAT_TRANSFER_FAILED', 'REQUEST_PROCESSED', 'REQUEST_REJECTED', 'REQUEST_CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "status" "public"."transaction_status_enum" NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "diamondstandard_status" "public"."transaction_diamondstandard_status_enum", "amount" numeric(10,2) NOT NULL DEFAULT '0', "amount_usd" numeric(10,2) NOT NULL DEFAULT '0', "token_rate" numeric(10,2) NOT NULL DEFAULT '0', "amount_out" numeric(18,8) NOT NULL DEFAULT '0', "token" character varying NOT NULL DEFAULT '', "token_out" character varying NOT NULL DEFAULT '', "uuid" character varying(50) NOT NULL DEFAULT '', "diamondstandard_sell_reference" character varying(50) NOT NULL DEFAULT '', "diamondstandard_request_id" integer NOT NULL DEFAULT '0', "error" character varying, "is_cripto_transfer" boolean NOT NULL DEFAULT false, "order_id" integer, "facility_from" character varying(48), "facility_to" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, "fee_buyer" numeric(10,2) NOT NULL DEFAULT '0', "fee_cultivator" numeric(10,2) NOT NULL DEFAULT '0', "issuer" character varying(155), "country" character varying(50), "last4" character varying(4), "scheme" character varying(15), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ce1ffdd0323d5d99131c5bdbef" ON "transaction" ("facility_to") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc71e3fd3c0549a25625bc03b4" ON "transaction" ("facility_from") `);
        await queryRunner.query(`CREATE TYPE "public"."facility_role_enum" AS ENUM('buyer', 'cultivator', 'buyerAndCultivator')`);
        await queryRunner.query(`CREATE TABLE "facility" ("id" character varying(48) NOT NULL, "phone_number" character varying(24), "email" character varying(255), "campaign_email" character varying(255), "index" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "alias" character varying(255), "display_name" character varying(255) NOT NULL, "description" text, "credentialed_date" date NOT NULL DEFAULT now(), "metrc_api_key" character varying(128) NOT NULL DEFAULT '', "hire_date" character varying(24), "is_online" boolean NOT NULL DEFAULT false, "is_chat_message" boolean NOT NULL DEFAULT false, "is_owner" boolean NOT NULL DEFAULT false, "is_manager" boolean NOT NULL DEFAULT false, "products_sync_date" TIMESTAMP WITH TIME ZONE, "quantity_active_employee" integer NOT NULL DEFAULT '0', "quantity_employee" integer NOT NULL DEFAULT '0', "public_address" character varying(128), "balance" numeric(10,2) NOT NULL DEFAULT '0', "balance_processing_withdraw" numeric(10,2) NOT NULL DEFAULT '0', "public_address_decode" character varying(128), "role" "public"."facility_role_enum" NOT NULL DEFAULT 'buyer', "is_activated_sync_job" boolean NOT NULL DEFAULT true, "asset_id" integer, "owner_id" character varying(48), "user_contact_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, "site" character varying(255) DEFAULT '', "youtube" character varying(255) DEFAULT '', "facebook" character varying(255) DEFAULT '', "twitter_x" character varying(255) DEFAULT '', "instagram" character varying(255) DEFAULT '', "full_address" character varying(255), "country" character varying(255), "city" character varying(255), "zip" integer, "address" character varying(255), "google_place_id" character varying(255), "license_number" character varying(48) NOT NULL, "license_start_date" date DEFAULT now(), "license_end_date" date DEFAULT now(), "license_type" character varying(64) NOT NULL, "is_license_active" boolean NOT NULL DEFAULT false, "is_medical" boolean NOT NULL DEFAULT false, "is_retail" boolean NOT NULL DEFAULT false, "is_hemp" boolean NOT NULL DEFAULT false, "restrict_harvest_plant_restore_time_hours" integer, "total_member_patients_allowed" integer, "restrict_wholesale_price_edit_days" integer, "restrict_plant_batch_adjustment_time_hours" integer, "can_grow_plants" boolean NOT NULL DEFAULT false, "can_create_opening_balance_plant_batches" boolean NOT NULL DEFAULT false, "can_clone_plant_batches" boolean NOT NULL DEFAULT false, "can_tag_plant_batches" boolean NOT NULL DEFAULT false, "plants_require_patient_affiliation" boolean NOT NULL DEFAULT false, "plant_batches_can_contain_mother_plants" boolean NOT NULL DEFAULT false, "can_update_plant_strains" boolean NOT NULL DEFAULT false, "can_track_vegetative_plants" boolean NOT NULL DEFAULT false, "can_create_immature_plant_packages_from_plants" boolean NOT NULL DEFAULT false, "can_package_vegetative_plants" boolean NOT NULL DEFAULT false, "can_package_waste" boolean NOT NULL DEFAULT false, "can_report_harvest_schedules" boolean NOT NULL DEFAULT false, "can_submit_harvests_for_testing" boolean NOT NULL DEFAULT false, "can_require_harvest_sample_lab_test_batches" boolean NOT NULL DEFAULT false, "can_report_strain_properties" boolean NOT NULL DEFAULT false, "can_create_opening_balance_packages" boolean NOT NULL DEFAULT false, "can_create_derived_packages" boolean NOT NULL DEFAULT false, "can_assign_locations_to_packages" boolean NOT NULL DEFAULT false, "can_update_locations_on_packages" boolean NOT NULL DEFAULT false, "packages_require_patient_affiliation" boolean NOT NULL DEFAULT false, "can_create_trade_sample_packages" boolean NOT NULL DEFAULT false, "can_donate_packages" boolean NOT NULL DEFAULT false, "can_submit_packages_for_testing" boolean NOT NULL DEFAULT false, "can_create_process_validation_packages" boolean NOT NULL DEFAULT false, "can_require_package_sample_lab_test_batches" boolean NOT NULL DEFAULT false, "can_request_product_remediation" boolean NOT NULL DEFAULT false, "can_remediate_packages_with_failed_lab_results" boolean NOT NULL DEFAULT false, "can_infuse_products" boolean NOT NULL DEFAULT false, "can_record_processing_jobs" boolean NOT NULL DEFAULT false, "can_record_product_for_destruction" boolean NOT NULL DEFAULT false, "can_destroy_product" boolean NOT NULL DEFAULT false, "can_test_packages" boolean NOT NULL DEFAULT false, "tests_require_lab_sample" boolean NOT NULL DEFAULT false, "can_transfer_from_external_facilities" boolean NOT NULL DEFAULT false, "can_sell_to_consumers" boolean NOT NULL DEFAULT false, "can_sell_to_patients" boolean NOT NULL DEFAULT false, "can_sell_to_external_patients" boolean NOT NULL DEFAULT false, "can_sell_to_caregivers" boolean NOT NULL DEFAULT false, "can_take_plant_batches_on_trip" boolean NOT NULL DEFAULT false, "can_take_plants_on_trip" boolean NOT NULL DEFAULT false, "can_take_harvests_on_trip" boolean NOT NULL DEFAULT false, "can_take_packages_on_trip" boolean NOT NULL DEFAULT false, "can_sell_from_packages_on_trip" boolean NOT NULL DEFAULT false, "advanced_sales" boolean NOT NULL DEFAULT false, "sales_require_patient_number" boolean NOT NULL DEFAULT false, "sales_require_external_patient_number" boolean NOT NULL DEFAULT false, "sales_require_external_patient_identification_method" boolean NOT NULL DEFAULT false, "sales_require_caregiver_number" boolean NOT NULL DEFAULT false, "sales_require_caregiver_patient_number" boolean NOT NULL DEFAULT false, "can_deliver_sales_to_consumers" boolean NOT NULL DEFAULT false, "sales_delivery_allow_planned_route" boolean NOT NULL DEFAULT false, "sales_delivery_allow_address" boolean NOT NULL DEFAULT false, "sales_delivery_allow_city" boolean NOT NULL DEFAULT false, "sales_delivery_allow_state" boolean NOT NULL DEFAULT false, "sales_delivery_allow_county" boolean NOT NULL DEFAULT false, "sales_delivery_allow_zip" boolean NOT NULL DEFAULT false, "sales_delivery_require_consumer_id" boolean NOT NULL DEFAULT false, "can_deliver_sales_to_patients" boolean NOT NULL DEFAULT false, "sales_delivery_require_patient_number" boolean NOT NULL DEFAULT false, "sales_delivery_require_recipient_name" boolean NOT NULL DEFAULT false, "is_sales_delivery_hub" boolean NOT NULL DEFAULT false, "can_have_member_patients" boolean NOT NULL DEFAULT false, "can_report_patient_check_ins" boolean NOT NULL DEFAULT false, "can_specify_patient_sales_limit_exemption" boolean NOT NULL DEFAULT false, "can_report_patients_adverse_responses" boolean NOT NULL DEFAULT false, "retailer_delivery" boolean NOT NULL DEFAULT false, "retailer_delivery_allow_trade_samples" boolean NOT NULL DEFAULT false, "retailer_delivery_allow_donations" boolean NOT NULL DEFAULT false, "retailer_delivery_require_price" boolean NOT NULL DEFAULT false, "retailer_delivery_allow_partial_packages" boolean NOT NULL DEFAULT false, "can_create_partial_packages" boolean NOT NULL DEFAULT false, "can_adjust_source_packages_with_partials" boolean NOT NULL DEFAULT false, "can_report_operational_exceptions" boolean NOT NULL DEFAULT false, "can_report_adulteration" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9fed65f0d0be12791939428602" ON "facility" ("user_contact_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1da8b970b48ac510a14be5d9fc" ON "facility" ("owner_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_07c6c82781d105a680b5c265be" ON "facility" ("id") `);
        await queryRunner.query(`CREATE TYPE "public"."item_quantity_type_enum" AS ENUM('CountBased', 'WeightBased')`);
        await queryRunner.query(`CREATE TYPE "public"."item_default_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`);
        await queryRunner.query(`CREATE TYPE "public"."item_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TYPE "public"."item_unit_cbd_content_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TYPE "public"."item_unit_thc_content_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TYPE "public"."item_unit_volume_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TYPE "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TYPE "public"."item_unit_thc_content_dose_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TYPE "public"."item_unit_weight_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TYPE "public"."item_unit_quantity_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer NOT NULL, "name" character varying NOT NULL, "product_category_name" character varying NOT NULL, "product_category_type" character varying NOT NULL, "is_expiration_date_required" boolean NOT NULL DEFAULT false, "is_sell_by_date_required" boolean NOT NULL DEFAULT false, "is_use_by_date_required" boolean NOT NULL DEFAULT false, "quantity_type" "public"."item_quantity_type_enum", "default_lab_testing_state" "public"."item_default_lab_testing_state_enum", "unit_of_measure_name" "public"."item_unit_of_measure_name_enum", "approval_status" character varying, "approval_status_date_time" TIMESTAMP WITH TIME ZONE, "strain_id" integer, "strain_name" character varying, "brand_name" character varying, "administration_method" character varying, "unit_cbd_percent" numeric, "unit_cbd_content" numeric, "unit_cbd_content_unit_of_measure_name" "public"."item_unit_cbd_content_unit_of_measure_name_enum", "unit_thc_percent" numeric, "unit_thc_content" numeric, "unit_thc_content_unit_of_measure_name" "public"."item_unit_thc_content_unit_of_measure_name_enum", "unit_volume" numeric, "unit_volume_unit_of_measure_name" "public"."item_unit_volume_unit_of_measure_name_enum", "unit_cbd_content_dose" numeric, "unit_cbd_content_dose_unit_of_measure_name" "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum", "unit_thc_content_dose" numeric, "unit_thc_content_dose_unit_of_measure_name" "public"."item_unit_thc_content_dose_unit_of_measure_name_enum", "unit_weight" numeric, "unit_weight_unit_of_measure_name" "public"."item_unit_weight_unit_of_measure_name_enum", "serving_size" character varying, "supply_duration_days" integer, "number_of_doses" integer, "unit_quantity" numeric, "unit_quantity_unit_of_measure_name" "public"."item_unit_quantity_unit_of_measure_name_enum", "public_ingredients" text, "description" text, "product_images" jsonb, "label_images" jsonb, "packaging_images" jsonb, "is_used" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."nft_primary_purpose_enum" AS ENUM('other', 'survey')`);
        await queryRunner.query(`CREATE TYPE "public"."nft_status_enum" AS ENUM('blocked', 'processing', 'done', 'error')`);
        await queryRunner.query(`CREATE TABLE "nft" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, "primary_purpose" "public"."nft_primary_purpose_enum" NOT NULL DEFAULT 'other', "status" "public"."nft_status_enum" NOT NULL DEFAULT 'processing', "logo_url" character varying, "properties" json NOT NULL DEFAULT '{}', "ipfs" character varying, "token_id" character varying, "serial" integer, "count_error" integer NOT NULL DEFAULT '0', "survey_id" integer, "blockchain_transaction_id" integer, "user_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_82372eb067d6dd351f224e7ae7" UNIQUE ("survey_id"), CONSTRAINT "PK_8f46897c58e23b0e7bf6c8e56b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."survey_status_enum" AS ENUM('New', 'Rejected', 'BuyerConfirmed', 'SurveySent', 'Done')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_appealing_visually_enum" AS ENUM('Low', 'Midz', 'Fyre')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_color_enum" AS ENUM('Green', 'Yellow', 'Purple')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_nose_enum" AS ENUM('Small', 'Medium', 'Large')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_smoked_enum" AS ENUM('Mild', 'Medium', 'Strong')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_experience_enum" AS ENUM('EuphoricCreative', 'HeadyMental', 'RelaxingPainrelieving', 'FugginStupid')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_intoxication_enum" AS ENUM('Meh', 'Stoned', 'Wrecked')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_often_consume_cannabis_enum" AS ENUM('Daily', 'Occassionally', 'Rarely')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_primary_purpose_enum" AS ENUM('PainRelief', 'MentalHealth', 'Recreation')`);
        await queryRunner.query(`CREATE TYPE "public"."survey_gender_enum" AS ENUM('Female', 'Male', 'Other')`);
        await queryRunner.query(`CREATE TABLE "survey" ("id" SERIAL NOT NULL, "status" "public"."survey_status_enum" NOT NULL DEFAULT 'New', "fullname" character varying(255) NOT NULL, "phone" character varying(24) NOT NULL, "uuid" character varying(50) NOT NULL DEFAULT '', "buyer_confirmed_date" TIMESTAMP WITH TIME ZONE, "buyer_rejected_date" TIMESTAMP WITH TIME ZONE, "survey_sent_date" TIMESTAMP WITH TIME ZONE, "completed_date" TIMESTAMP WITH TIME ZONE, "appealing_visually" "public"."survey_appealing_visually_enum", "color" "public"."survey_color_enum", "aroma_smells" smallint array NOT NULL DEFAULT '{}', "nose" "public"."survey_nose_enum", "smoked" "public"."survey_smoked_enum", "experience" "public"."survey_experience_enum", "intoxication" "public"."survey_intoxication_enum", "often_consume_cannabis" "public"."survey_often_consume_cannabis_enum", "primary_purpose" "public"."survey_primary_purpose_enum", "age_range" smallint, "gender" "public"."survey_gender_enum", "subcompany_id" integer NOT NULL, "product_id" integer, "user_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcompany" ("id" SERIAL NOT NULL, "quantity" numeric(10,2) NOT NULL DEFAULT '0', "quantity_sold" numeric(10,2) NOT NULL DEFAULT '0', "is_survey_pending" boolean NOT NULL DEFAULT false, "company_id" integer NOT NULL, "facility_buyer_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "CHK_3997d3ca3051295fbcde19180d" CHECK ("quantity" >= 0), CONSTRAINT "CHK_834c5bd3adc18b65661893792d" CHECK ("quantity_sold" >= 0), CONSTRAINT "PK_da4a181c492ef44f7b9cb7f59b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."company_status_enum" AS ENUM('Active', 'Draft', 'Archived', 'Pending', 'Rejected', 'Completed')`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "date_start" date NOT NULL, "date_end" date, "company_name" character varying(255) NOT NULL DEFAULT '', "status" "public"."company_status_enum" NOT NULL DEFAULT 'Draft', "quantity" integer NOT NULL DEFAULT '0', "quantity_sold" integer NOT NULL DEFAULT '0', "unit_weight" integer NOT NULL DEFAULT '1', "total_gram" integer NOT NULL DEFAULT '0', "total_lb" numeric(10,5) NOT NULL DEFAULT '0', "total_people_registered" integer NOT NULL DEFAULT '0', "total_people_completed" integer NOT NULL DEFAULT '0', "total_people_redemption" integer NOT NULL DEFAULT '0', "facility_cultivator_id" character varying(48) NOT NULL, "product_survey_id" integer NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "CHK_bae4c608aeaefa31ec2ca183e8" CHECK ("quantity" >= 0), CONSTRAINT "CHK_333591b84a1631928093a4705f" CHECK ("unit_weight" > 0), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_40ba13327d1e116a1f6bb19b51" ON "company" ("facility_cultivator_id") `);
        await queryRunner.query(`CREATE TYPE "public"."product_tree_status_enum" AS ENUM('new', 'listed', 'unlisted', 'archived')`);
        await queryRunner.query(`CREATE TYPE "public"."product_tree_package_type_enum" AS ENUM('Product', 'ImmaturePlant', 'VegetativePlant', 'PlantWaste', 'HarvestWaste')`);
        await queryRunner.query(`CREATE TYPE "public"."product_tree_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`);
        await queryRunner.query(`CREATE TYPE "public"."product_tree_unit_of_measure_abbreviation_enum" AS ENUM('ea', 'oz', 'lb', 'g', 'mg', 'kg', 't')`);
        await queryRunner.query(`CREATE TYPE "public"."product_tree_initial_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`);
        await queryRunner.query(`CREATE TYPE "public"."product_tree_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`);
        await queryRunner.query(`CREATE TABLE "product_tree" ("id" integer NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "description" text, "status" "public"."product_tree_status_enum" NOT NULL DEFAULT 'new', "quantity_metrc" numeric(10,2) NOT NULL DEFAULT '0', "quantity" numeric(10,2) NOT NULL DEFAULT '0', "quantity_stock_min" numeric(10,2) NOT NULL DEFAULT '0.25', "quantity_stock" numeric(10,2) NOT NULL DEFAULT '0', "quantity_when_creation" numeric(10,2) NOT NULL DEFAULT '0', "label" character varying NOT NULL, "source_package_labels" character varying, "package_type" "public"."product_tree_package_type_enum", "source_harvest_count" integer NOT NULL DEFAULT '0', "source_package_count" integer NOT NULL DEFAULT '0', "source_processing_job_count" integer NOT NULL DEFAULT '0', "location_id" integer, "location_name" character varying, "location_type_name" character varying, "unit_of_measure_name" "public"."product_tree_unit_of_measure_name_enum", "unit_of_measure_abbreviation" "public"."product_tree_unit_of_measure_abbreviation_enum", "packaged_date" date NOT NULL, "initial_lab_testing_state" "public"."product_tree_initial_lab_testing_state_enum", "lab_testing_state" "public"."product_tree_lab_testing_state_enum", "lab_testing_state_date" date NOT NULL, "is_on_hold" boolean NOT NULL DEFAULT false, "is_on_trip" boolean NOT NULL DEFAULT false, "is_on_retailer_delivery" boolean NOT NULL DEFAULT false, "last_modified" TIMESTAMP WITH TIME ZONE NOT NULL, "lab_test_documents" character varying(100) array, "terpenes" character varying array, "genetic_cross" character varying, "total_thc" numeric(4,2) NOT NULL DEFAULT '0', "total_cbd" numeric(4,2) NOT NULL DEFAULT '0', "sync_date" TIMESTAMP WITH TIME ZONE, "parentId" integer, "facility_id" character varying(48), "thumbnail_id" integer, "item_id" integer NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "CHK_19df7ab5b3dbdae22292347b8c" CHECK ("quantity" >= 0), CONSTRAINT "CHK_8d1933d21fabced7cf710d0015" CHECK ("quantity_stock_min" >= 0), CONSTRAINT "CHK_50fc53ff3da29c7c79ed2fedf4" CHECK ("quantity_stock" >= 0), CONSTRAINT "PK_583bf7af013e9207c2e1e8fa7d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_06d88967c326210c4667ac0f5a" ON "product_tree" ("facility_id") `);
        await queryRunner.query(`CREATE TYPE "public"."asset_type_enum" AS ENUM('image', 'logo')`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" SERIAL NOT NULL, "type" "public"."asset_type_enum" NOT NULL DEFAULT 'logo', "hashname" character varying(100) NOT NULL, "filename" character varying(150) NOT NULL, "mimetype" character varying(100) NOT NULL, "path" character varying(255) NOT NULL, "size" integer NOT NULL DEFAULT '0', "width" integer NOT NULL DEFAULT '0', "height" integer NOT NULL DEFAULT '0', "ipfs" character varying, "product_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ac8a52a96c145ccc9862ef50e7" ON "asset" ("id", "hashname") `);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'client', 'admin_platform', 'owner_platform')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying(48) NOT NULL, "index" SERIAL NOT NULL, "fullname" character varying(255) NOT NULL, "email" character varying(255), "join_date" TIMESTAMP WITH TIME ZONE, "is_blocked" boolean NOT NULL DEFAULT false, "is_kyc" boolean NOT NULL DEFAULT false, "issuer" character varying(128), "phone_number" character varying(24), "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "public_address" character varying(128), "public_address_decode" character varying(128), "context_id" character varying(48), "asset_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, "license_number" character varying(48) NOT NULL, "license_start_date" date DEFAULT now(), "license_end_date" date DEFAULT now(), "license_type" character varying(64) NOT NULL, "is_license_active" boolean NOT NULL DEFAULT false, "is_notification_contact_us" boolean NOT NULL DEFAULT false, "is_notification_join_facility" boolean NOT NULL DEFAULT false, "is_recovery_password" boolean NOT NULL DEFAULT false, "code_recovery_password" character varying(256), "date_recovery_password" TIMESTAMP WITH TIME ZONE, "date_recovery_done" TIMESTAMP WITH TIME ZONE, "password" character varying(250), "salt" character varying(255) NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2265a75ef87d0f38fbbacfbfaf" ON "user" ("phone_number") WHERE phone_number IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9e3516cf97a57b6f6199fa95a8" ON "user" ("email") WHERE email IS NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_55b4fcc847ce8295e83abd491f" ON "user" ("context_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id") `);
        await queryRunner.query(`CREATE TYPE "public"."invite_type_enum" AS ENUM('buyer', 'employee')`);
        await queryRunner.query(`CREATE TYPE "public"."invite_status_enum" AS ENUM('processing', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "invite" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL DEFAULT '', "type" "public"."invite_type_enum" NOT NULL, "status" "public"."invite_status_enum" NOT NULL DEFAULT 'processing', "code" character varying(20), "phone" character varying(24) NOT NULL, "facility_id" character varying(48), "relation_facility_id" character varying(48), "employee_id" character varying(48), "owner_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_item" ("id" SERIAL NOT NULL, "quantity" numeric(5,2) NOT NULL DEFAULT '0', "price" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(10,2) NOT NULL DEFAULT '0', "product_id" integer NOT NULL, "cart_id" integer NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "fee" numeric(10,2) NOT NULL DEFAULT '0', "cost_products" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(10,2) NOT NULL DEFAULT '0', "facility_buyer_id" character varying(48) NOT NULL, "facility_cultivator_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bd4072609f73da2bcfd53b0487" ON "cart" ("facility_cultivator_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc7005ba4cf7cbd5b9c302954e" ON "cart" ("facility_buyer_id") `);
        await queryRunner.query(`CREATE TYPE "public"."request_type_enum" AS ENUM('contactUs', 'request')`);
        await queryRunner.query(`CREATE TYPE "public"."request_facility_role_enum" AS ENUM('buyer', 'cultivator')`);
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum" AS ENUM('new', 'processing', 'closed', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "request" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL DEFAULT '', "company_name" character varying(255) NOT NULL DEFAULT '', "message" character varying DEFAULT '', "phone" character varying(24), "email" character varying(255), "license_number" character varying(48), "type" "public"."request_type_enum" NOT NULL, "facility_role" "public"."request_facility_role_enum", "status" "public"."request_status_enum" NOT NULL DEFAULT 'new', "is_activated" boolean NOT NULL DEFAULT false, "code" character varying(20), "message_reject" character varying, "admin_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "code" ("id" SERIAL NOT NULL, "generate_code_count" integer NOT NULL DEFAULT '0', "attempt_date" TIMESTAMP WITH TIME ZONE, "phone" character varying(24), "code" integer, "ip_address" character varying(15) NOT NULL, "user_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_2c4a681bc6a5fa9f5d4149f86b" UNIQUE ("user_id"), CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notification_status_enum" AS ENUM('read', 'new')`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('message')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "theme" character varying NOT NULL, "description" character varying(3000) NOT NULL DEFAULT '', "status" "public"."notification_status_enum" NOT NULL DEFAULT 'new', "type" "public"."notification_type_enum" NOT NULL, "owner_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id")); COMMENT ON COLUMN "notification"."theme" IS 'Theme'; COMMENT ON COLUMN "notification"."description" IS 'Description'`);
        await queryRunner.query(`CREATE TYPE "public"."configuration_type_enum" AS ENUM('commissionOrderBuyer', 'commissionOrderCultivator')`);
        await queryRunner.query(`CREATE TABLE "configuration" ("id" SERIAL NOT NULL, "value" character varying(100) NOT NULL DEFAULT '', "type" "public"."configuration_type_enum" NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_9a60597808bce764b9cd7969738" UNIQUE ("type"), CONSTRAINT "PK_03bad512915052d2342358f0d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_to_product" ("company_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_5b1d2a2f4118bc5de50100a35ef" PRIMARY KEY ("company_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91c6fbe3cabaee010e169ce485" ON "company_to_product" ("company_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd72870df6ea37d2bed971246c" ON "company_to_product" ("product_id") `);
        await queryRunner.query(`CREATE TABLE "user_to_facilities" ("user_id" character varying(48) NOT NULL, "facility_id" character varying(48) NOT NULL, CONSTRAINT "PK_d18a6c052c34da34c81612e6f72" PRIMARY KEY ("user_id", "facility_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe3e233a3057f433fa0eff473c" ON "user_to_facilities" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f46d93cec492d987e88e066f9" ON "user_to_facilities" ("facility_id") `);
        await queryRunner.query(`CREATE TABLE "product_tree_closure" ("ancestor_id" integer NOT NULL, "descendant_id" integer NOT NULL, CONSTRAINT "PK_f88eb67d289fa46b401c9a5ffb2" PRIMARY KEY ("ancestor_id", "descendant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_20c75b5743c0c6abc15e523e49" ON "product_tree_closure" ("ancestor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd8525385fddd20b5164d562fc" ON "product_tree_closure" ("descendant_id") `);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_9f1749803f00eed29736dbc27c8" FOREIGN KEY ("facility_rel_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_2ae75e3ae7b509aa6dd84f8bd3e" FOREIGN KEY ("parent_product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_224f346de37acb5fac82a0c3303" FOREIGN KEY ("contact_person_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_bc635c4c3e886187fad43e328d5" FOREIGN KEY ("facility_buyer_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_5ce0ee80ac95c2bf7c4f23f98ce" FOREIGN KEY ("facility_cultivator_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ADD CONSTRAINT "FK_a1d4b86350cd613126214158754" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ADD CONSTRAINT "FK_d372feed22c89c79283824327ee" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_9011283056620f5eaa7ad74cef6" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_bc71e3fd3c0549a25625bc03b46" FOREIGN KEY ("facility_from") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_ce1ffdd0323d5d99131c5bdbef0" FOREIGN KEY ("facility_to") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "facility" ADD CONSTRAINT "FK_c366539aa87e3409918f09bedb7" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "facility" ADD CONSTRAINT "FK_1da8b970b48ac510a14be5d9fc9" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "facility" ADD CONSTRAINT "FK_9fed65f0d0be127919394286027" FOREIGN KEY ("user_contact_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nft" ADD CONSTRAINT "FK_82372eb067d6dd351f224e7ae7f" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nft" ADD CONSTRAINT "FK_e34636adb2dd376cd30ab1d987a" FOREIGN KEY ("blockchain_transaction_id") REFERENCES "transaction_blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nft" ADD CONSTRAINT "FK_5c9c2fd34e6b1ed340e8cb3e0c9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_a6685ffd34936d08f65d9272f2f" FOREIGN KEY ("subcompany_id") REFERENCES "subcompany"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_8733928ac5eebe45bdcbcc80d36" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_a37da0d039df5145bd187a32e09" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcompany" ADD CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcompany" ADD CONSTRAINT "FK_cc3d2db0815214f662dcce016f2" FOREIGN KEY ("facility_buyer_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_40ba13327d1e116a1f6bb19b51a" FOREIGN KEY ("facility_cultivator_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_15d076fe237df620ca1caad22c3" FOREIGN KEY ("product_survey_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "FK_0a08c40bcce1e30d38b67f673f6" FOREIGN KEY ("parentId") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "FK_06d88967c326210c4667ac0f5ad" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "FK_4bae414fa401636cb9f3075bcfd" FOREIGN KEY ("thumbnail_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "FK_20bf2d4c568a6daf57209113e5d" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_980f83643b37cdae0d37df0c3e8" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_55b4fcc847ce8295e83abd491f1" FOREIGN KEY ("context_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e21f8c1180fa83c07e5399ecb04" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_0d1c8d3a6602c6afdd9c016b04d" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_8a2aee0306b23d1a037fe20f749" FOREIGN KEY ("relation_facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_6a02e54f58e4aa0104db8ea746d" FOREIGN KEY ("employee_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_267ec7b773607be6949152c583b" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_67a2e8406e01ffa24ff9026944e" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_fc7005ba4cf7cbd5b9c302954e7" FOREIGN KEY ("facility_buyer_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_bd4072609f73da2bcfd53b0487c" FOREIGN KEY ("facility_cultivator_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_0ddcbcfa15fa2bd08c66669c445" FOREIGN KEY ("admin_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "code" ADD CONSTRAINT "FK_2c4a681bc6a5fa9f5d4149f86bf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_3fd4edd1f8ca57ed9c674346fee" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_to_product" ADD CONSTRAINT "FK_91c6fbe3cabaee010e169ce485c" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_to_product" ADD CONSTRAINT "FK_bd72870df6ea37d2bed971246c2" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_2f46d93cec492d987e88e066f96" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tree_closure" ADD CONSTRAINT "FK_20c75b5743c0c6abc15e523e493" FOREIGN KEY ("ancestor_id") REFERENCES "product_tree"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tree_closure" ADD CONSTRAINT "FK_cd8525385fddd20b5164d562fcd" FOREIGN KEY ("descendant_id") REFERENCES "product_tree"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "company_insight_view" AS 
  select 
    res.product_id as id,
    res.product_id,
    res.company_id,
    res.facility_cultivator_id,
    res.surveys,
    (select survey.appealing_visually FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appealing_visually
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appealing_visually,
    (select survey.color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.smoked FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.smoked
      ORDER BY COUNT(*) DESC
      limit 1
    ) as smoked,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.intoxication FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.intoxication
      ORDER BY COUNT(*) DESC
      limit 1
    ) as intoxication,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose,
    (select survey.age_range FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.age_range
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age_range,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (
      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells
	  FROM (
	  SELECT aroma_smells
	      FROM (
	        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells 
	        FROM public.survey survey
	        left join public.subcompany s on s.id = survey.subcompany_id 
	        where survey.deleted_date is null 
	          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
	          and s.company_id = res.company_id
	          and survey.product_id = res.product_id
	      ) AS subquery 
	      GROUP BY subquery.product_id, subquery.aroma_smells  
	      ORDER BY COUNT(*) 
	      DESC LIMIT 3
	      ) as resultAroma) AS aroma_smells
  from (
    select 
      survey.product_id,
      s.company_id,
      c.facility_cultivator_id,
      COUNT(*) as surveys
    from public.survey survey
    left join public.subcompany s on s.id = survey.subcompany_id 
    left join public.company c on c.id = s.company_id
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, c.facility_cultivator_id
  ) as res;
 `);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select survey.appealing_visually FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appealing_visually\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appealing_visually,\n    (select survey.color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.smoked FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.smoked\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as smoked,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.intoxication FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.intoxication\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as intoxication,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose,\n    (select survey.age_range FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.age_range\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as age_range,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (\n      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells\n\t  FROM (\n\t  SELECT aroma_smells\n\t      FROM (\n\t        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n\t        FROM public.survey survey\n\t        left join public.subcompany s on s.id = survey.subcompany_id \n\t        where survey.deleted_date is null \n\t          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n\t          and s.company_id = res.company_id\n\t          and survey.product_id = res.product_id\n\t      ) AS subquery \n\t      GROUP BY subquery.product_id, subquery.aroma_smells  \n\t      ORDER BY COUNT(*) \n\t      DESC LIMIT 3\n\t      ) as resultAroma) AS aroma_smells\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, c.facility_cultivator_id\n  ) as res;"]);
        await queryRunner.query(`CREATE VIEW "company_insight_buyer_view" AS 
  select 
    res.product_id as id,
    res.product_id,
    res.company_id,
    res.facility_buyer_id,
    res.facility_cultivator_id,
    res.surveys,
    (select survey.appealing_visually FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appealing_visually
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appealing_visually,
    (select survey.color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.smoked FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.smoked
      ORDER BY COUNT(*) DESC
      limit 1
    ) as smoked,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.intoxication FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.intoxication
      ORDER BY COUNT(*) DESC
      limit 1
    ) as intoxication,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose,
    (select survey.age_range FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.age_range
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age_range,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (
      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells
	  FROM (
	  SELECT aroma_smells
	      FROM (
	        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells 
	        FROM public.survey survey
	        left join public.subcompany s on s.id = survey.subcompany_id 
	        where survey.deleted_date is null 
	          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
	          and s.company_id = res.company_id
	          and survey.product_id = res.product_id
	      ) AS subquery 
	      GROUP BY subquery.product_id, subquery.aroma_smells  
	      ORDER BY COUNT(*) 
	      DESC LIMIT 3
	      ) as resultAroma) AS aroma_smells
  from (
    select 
      survey.product_id,
      s.company_id,
      s.facility_buyer_id,
      c.facility_cultivator_id,
      COUNT(*) as surveys
    from public.survey survey
    left join public.subcompany s on s.id = survey.subcompany_id 
    left join public.company c on c.id = s.company_id
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id
  ) as res;
 `);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_buyer_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_buyer_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select survey.appealing_visually FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appealing_visually\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appealing_visually,\n    (select survey.color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.smoked FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.smoked\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as smoked,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.intoxication FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.intoxication\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as intoxication,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose,\n    (select survey.age_range FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.age_range\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as age_range,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (\n      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells\n\t  FROM (\n\t  SELECT aroma_smells\n\t      FROM (\n\t        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n\t        FROM public.survey survey\n\t        left join public.subcompany s on s.id = survey.subcompany_id \n\t        where survey.deleted_date is null \n\t          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n\t          and s.company_id = res.company_id\n\t          and survey.product_id = res.product_id\n\t      ) AS subquery \n\t      GROUP BY subquery.product_id, subquery.aroma_smells  \n\t      ORDER BY COUNT(*) \n\t      DESC LIMIT 3\n\t      ) as resultAroma) AS aroma_smells\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      s.facility_buyer_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id\n  ) as res;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_buyer_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_buyer_view"`);
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_view"`);
        await queryRunner.query(`ALTER TABLE "product_tree_closure" DROP CONSTRAINT "FK_cd8525385fddd20b5164d562fcd"`);
        await queryRunner.query(`ALTER TABLE "product_tree_closure" DROP CONSTRAINT "FK_20c75b5743c0c6abc15e523e493"`);
        await queryRunner.query(`ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_2f46d93cec492d987e88e066f96"`);
        await queryRunner.query(`ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb"`);
        await queryRunner.query(`ALTER TABLE "company_to_product" DROP CONSTRAINT "FK_bd72870df6ea37d2bed971246c2"`);
        await queryRunner.query(`ALTER TABLE "company_to_product" DROP CONSTRAINT "FK_91c6fbe3cabaee010e169ce485c"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_3fd4edd1f8ca57ed9c674346fee"`);
        await queryRunner.query(`ALTER TABLE "code" DROP CONSTRAINT "FK_2c4a681bc6a5fa9f5d4149f86bf"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_0ddcbcfa15fa2bd08c66669c445"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_bd4072609f73da2bcfd53b0487c"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_fc7005ba4cf7cbd5b9c302954e7"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_67a2e8406e01ffa24ff9026944e"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_267ec7b773607be6949152c583b"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_6a02e54f58e4aa0104db8ea746d"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_8a2aee0306b23d1a037fe20f749"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_0d1c8d3a6602c6afdd9c016b04d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e21f8c1180fa83c07e5399ecb04"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_55b4fcc847ce8295e83abd491f1"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_980f83643b37cdae0d37df0c3e8"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "FK_20bf2d4c568a6daf57209113e5d"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "FK_4bae414fa401636cb9f3075bcfd"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "FK_06d88967c326210c4667ac0f5ad"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "FK_0a08c40bcce1e30d38b67f673f6"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_15d076fe237df620ca1caad22c3"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_40ba13327d1e116a1f6bb19b51a"`);
        await queryRunner.query(`ALTER TABLE "subcompany" DROP CONSTRAINT "FK_cc3d2db0815214f662dcce016f2"`);
        await queryRunner.query(`ALTER TABLE "subcompany" DROP CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_a37da0d039df5145bd187a32e09"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_8733928ac5eebe45bdcbcc80d36"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_a6685ffd34936d08f65d9272f2f"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_5c9c2fd34e6b1ed340e8cb3e0c9"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_e34636adb2dd376cd30ab1d987a"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_82372eb067d6dd351f224e7ae7f"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP CONSTRAINT "FK_9fed65f0d0be127919394286027"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP CONSTRAINT "FK_1da8b970b48ac510a14be5d9fc9"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP CONSTRAINT "FK_c366539aa87e3409918f09bedb7"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_ce1ffdd0323d5d99131c5bdbef0"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_bc71e3fd3c0549a25625bc03b46"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_9011283056620f5eaa7ad74cef6"`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" DROP CONSTRAINT "FK_d372feed22c89c79283824327ee"`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" DROP CONSTRAINT "FK_a1d4b86350cd613126214158754"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_5ce0ee80ac95c2bf7c4f23f98ce"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_bc635c4c3e886187fad43e328d5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_224f346de37acb5fac82a0c3303"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_2ae75e3ae7b509aa6dd84f8bd3e"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP CONSTRAINT "FK_9f1749803f00eed29736dbc27c8"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd8525385fddd20b5164d562fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_20c75b5743c0c6abc15e523e49"`);
        await queryRunner.query(`DROP TABLE "product_tree_closure"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f46d93cec492d987e88e066f9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe3e233a3057f433fa0eff473c"`);
        await queryRunner.query(`DROP TABLE "user_to_facilities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd72870df6ea37d2bed971246c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91c6fbe3cabaee010e169ce485"`);
        await queryRunner.query(`DROP TABLE "company_to_product"`);
        await queryRunner.query(`DROP TABLE "configuration"`);
        await queryRunner.query(`DROP TYPE "public"."configuration_type_enum"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notification_status_enum"`);
        await queryRunner.query(`DROP TABLE "code"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."request_facility_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."request_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc7005ba4cf7cbd5b9c302954e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd4072609f73da2bcfd53b0487"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "cart_item"`);
        await queryRunner.query(`DROP TABLE "invite"`);
        await queryRunner.query(`DROP TYPE "public"."invite_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."invite_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cace4a159ff9f2512dd4237376"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55b4fcc847ce8295e83abd491f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e3516cf97a57b6f6199fa95a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2265a75ef87d0f38fbbacfbfaf"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac8a52a96c145ccc9862ef50e7"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TYPE "public"."asset_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06d88967c326210c4667ac0f5a"`);
        await queryRunner.query(`DROP TABLE "product_tree"`);
        await queryRunner.query(`DROP TYPE "public"."product_tree_lab_testing_state_enum"`);
        await queryRunner.query(`DROP TYPE "public"."product_tree_initial_lab_testing_state_enum"`);
        await queryRunner.query(`DROP TYPE "public"."product_tree_unit_of_measure_abbreviation_enum"`);
        await queryRunner.query(`DROP TYPE "public"."product_tree_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."product_tree_package_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."product_tree_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40ba13327d1e116a1f6bb19b51"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TYPE "public"."company_status_enum"`);
        await queryRunner.query(`DROP TABLE "subcompany"`);
        await queryRunner.query(`DROP TABLE "survey"`);
        await queryRunner.query(`DROP TYPE "public"."survey_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_primary_purpose_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_often_consume_cannabis_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_intoxication_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_experience_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_smoked_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_nose_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_color_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_appealing_visually_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_status_enum"`);
        await queryRunner.query(`DROP TABLE "nft"`);
        await queryRunner.query(`DROP TYPE "public"."nft_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."nft_primary_purpose_enum"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TYPE "public"."item_unit_quantity_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_unit_weight_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_unit_thc_content_dose_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_unit_volume_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_unit_thc_content_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_unit_cbd_content_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_unit_of_measure_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_default_lab_testing_state_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_quantity_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07c6c82781d105a680b5c265be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1da8b970b48ac510a14be5d9fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9fed65f0d0be12791939428602"`);
        await queryRunner.query(`DROP TABLE "facility"`);
        await queryRunner.query(`DROP TYPE "public"."facility_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc71e3fd3c0549a25625bc03b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce1ffdd0323d5d99131c5bdbef"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_diamondstandard_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_status_enum"`);
        await queryRunner.query(`DROP TABLE "transaction_blockchain"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_blockchain_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc635c4c3e886187fad43e328d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ce0ee80ac95c2bf7c4f23f98c"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_shipping_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_product"`);
        await queryRunner.query(`DROP TABLE "facility_to_facility"`);
    }

}
