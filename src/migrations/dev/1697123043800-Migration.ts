import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697123043800 implements MigrationInterface {
  name = 'Migration1697123043800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item" ("id" integer NOT NULL, "name" character varying NOT NULL, "product_category_name" character varying NOT NULL, "product_category_type" character varying NOT NULL, "is_expiration_date_required" boolean NOT NULL DEFAULT true, "is_sell_by_date_required" boolean NOT NULL DEFAULT true, "default_lab_testing_state" character varying, "unit_of_measure_name" character varying, "approval_status" character varying, "approval_status_date_time" TIMESTAMP WITH TIME ZONE, "strain_id" integer, "strain_name" character varying, "brand_name" character varying, "administration_method" character varying, "unit_weight" numeric, "unit_weight_unit_of_measure_name" character varying, "serving_size" character varying, "supply_duration_days" integer, "number_of_doses" integer, "unit_quantity" numeric, "unit_quantity_unit_of_measure_name" character varying, "public_ingredients" text, "description" text, "product_images" jsonb, "label_images" jsonb, "packaging_images" jsonb, "is_used" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "product_category_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "product_category_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "is_expiration_date_required"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "is_sell_by_date_required"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "default_lab_testing_state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "approval_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "approval_status_date_time"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "strain_id"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "strain_name"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "item_brand_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "administration_method"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unit_weight"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "unit_weight_unit_of_measure_name"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "serving_size"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "supply_duration_days"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "number_of_doses"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "unit_quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "unit_quantity_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "public_ingredients"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "product_images"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "label_images"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "packaging_images"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "is_used"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "label" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "package_type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "source_harvest_count" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "source_package_count" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "source_processing_job_count" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "location_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "location_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "location_type_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit_of_measure_abbreviation" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "packaged_date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "initial_lab_testing_state" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "lab_testing_state" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "lab_testing_state_date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "is_on_hold" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "is_on_trip" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "is_on_retailer_delivery" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "last_modified" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "item_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_83c3b7a80f6fe1d5ad7fa05a2a2" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_83c3b7a80f6fe1d5ad7fa05a2a2"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "item_id"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "last_modified"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "is_on_retailer_delivery"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "is_on_trip"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "is_on_hold"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "lab_testing_state_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "lab_testing_state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "initial_lab_testing_state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "packaged_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "unit_of_measure_abbreviation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "location_type_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "location_name"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "location_id"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "source_processing_job_count"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "source_package_count"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "source_harvest_count"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "package_type"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "label"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "is_used" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "packaging_images" jsonb`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "label_images" jsonb`);
    await queryRunner.query(`ALTER TABLE "product" ADD "product_images" jsonb`);
    await queryRunner.query(`ALTER TABLE "product" ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "public_ingredients" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit_quantity_unit_of_measure_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit_quantity" numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "number_of_doses" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "supply_duration_days" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "serving_size" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit_weight_unit_of_measure_name" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "unit_weight" numeric`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "administration_method" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "item_brand_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "strain_name" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "strain_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "approval_status_date_time" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "approval_status" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "default_lab_testing_state" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "is_sell_by_date_required" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "is_expiration_date_required" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "product_category_type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "product_category_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "item"`);
  }
}
