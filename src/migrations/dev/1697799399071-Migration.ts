import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697799399071 implements MigrationInterface {
  name = 'Migration1697799399071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" ADD "is_use_by_date_required" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_quantity_type_enum" AS ENUM('CountBased', 'WeightBased')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "quantity_type" "public"."item_quantity_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_cbd_percent" numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_cbd_content" numeric`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_cbd_content_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_cbd_content_unit_of_measure_name" "public"."item_unit_cbd_content_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_thc_percent" numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_thc_content" numeric`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_thc_content_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_thc_content_unit_of_measure_name" "public"."item_unit_thc_content_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "item" ADD "unit_volume" numeric`);
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_volume_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_volume_unit_of_measure_name" "public"."item_unit_volume_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_cbd_content_dose" numeric`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_cbd_content_dose_unit_of_measure_name" "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_thc_content_dose" numeric`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_thc_content_dose_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_thc_content_dose_unit_of_measure_name" "public"."item_unit_thc_content_dose_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ALTER COLUMN "is_expiration_date_required" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ALTER COLUMN "is_sell_by_date_required" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "default_lab_testing_state"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_default_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "default_lab_testing_state" "public"."item_default_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_of_measure_name"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_of_measure_name" "public"."item_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_weight_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_weight_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_weight_unit_of_measure_name" "public"."item_unit_weight_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_quantity_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_unit_quantity_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_quantity_unit_of_measure_name" "public"."item_unit_quantity_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "package_type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."product_package_type_enum" AS ENUM('Product', 'ImmaturePlant', 'VegetativePlant', 'PlantWaste', 'HarvestWaste')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "package_type" "public"."product_package_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "unit_of_measure_name"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit_of_measure_name" "public"."product_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "unit_of_measure_abbreviation"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_unit_of_measure_abbreviation_enum" AS ENUM('ea', 'oz', 'lb', 'g', 'mg', 'kg', 't')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit_of_measure_abbreviation" "public"."product_unit_of_measure_abbreviation_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "initial_lab_testing_state"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_initial_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "initial_lab_testing_state" "public"."product_initial_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "lab_testing_state"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "lab_testing_state" "public"."product_lab_testing_state_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "lab_testing_state"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "lab_testing_state" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "initial_lab_testing_state"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_initial_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "initial_lab_testing_state" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "unit_of_measure_abbreviation"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_unit_of_measure_abbreviation_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit_of_measure_abbreviation" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit_of_measure_name" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "package_type"`);
    await queryRunner.query(`DROP TYPE "public"."product_package_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "package_type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_quantity_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_quantity_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_quantity_unit_of_measure_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_weight_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_weight_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_weight_unit_of_measure_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "unit_of_measure_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "default_lab_testing_state"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_default_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "default_lab_testing_state" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ALTER COLUMN "is_sell_by_date_required" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ALTER COLUMN "is_expiration_date_required" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_thc_content_dose_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_thc_content_dose_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_thc_content_dose"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_cbd_content_dose_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_cbd_content_dose_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_cbd_content_dose"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_volume_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_volume_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "unit_volume"`);
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_thc_content_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_thc_content_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_thc_content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_thc_percent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_cbd_content_unit_of_measure_name"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."item_unit_cbd_content_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_cbd_content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "unit_cbd_percent"`,
    );
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "quantity_type"`);
    await queryRunner.query(`DROP TYPE "public"."item_quantity_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "is_use_by_date_required"`,
    );
  }
}
