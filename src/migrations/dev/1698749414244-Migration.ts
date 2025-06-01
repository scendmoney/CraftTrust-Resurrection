import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1698749414244 implements MigrationInterface {
  name = 'Migration1698749414244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP CONSTRAINT "FK_5cd3c8b06d45e575517e8358033"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP CONSTRAINT "FK_83c3b7a80f6fe1d5ad7fa05a2a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP CONSTRAINT "FK_64785df36f923563795d325d68e"`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_tree_closure" ("ancestor_id" integer NOT NULL, "descendant_id" integer NOT NULL, CONSTRAINT "PK_f88eb67d289fa46b401c9a5ffb2" PRIMARY KEY ("ancestor_id", "descendant_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_20c75b5743c0c6abc15e523e49" ON "product_tree_closure" ("ancestor_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd8525385fddd20b5164d562fc" ON "product_tree_closure" ("descendant_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD "source_package_labels" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD "parentId" integer`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_status_enum" RENAME TO "product_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_tree_status_enum" AS ENUM('new', 'listed', 'unlisted', 'archived')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "status" TYPE "public"."product_tree_status_enum" USING "status"::"text"::"public"."product_tree_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "status" SET DEFAULT 'new'`,
    );
    await queryRunner.query(`DROP TYPE "public"."product_status_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."product_package_type_enum" RENAME TO "product_package_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_tree_package_type_enum" AS ENUM('Product', 'ImmaturePlant', 'VegetativePlant', 'PlantWaste', 'HarvestWaste')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "package_type" TYPE "public"."product_tree_package_type_enum" USING "package_type"::"text"::"public"."product_tree_package_type_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_package_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_unit_of_measure_name_enum" RENAME TO "product_unit_of_measure_name_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_tree_unit_of_measure_name_enum" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "unit_of_measure_name" TYPE "public"."product_tree_unit_of_measure_name_enum" USING "unit_of_measure_name"::"text"::"public"."product_tree_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_unit_of_measure_name_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_unit_of_measure_abbreviation_enum" RENAME TO "product_unit_of_measure_abbreviation_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_tree_unit_of_measure_abbreviation_enum" AS ENUM('ea', 'oz', 'lb', 'g', 'mg', 'kg', 't')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "unit_of_measure_abbreviation" TYPE "public"."product_tree_unit_of_measure_abbreviation_enum" USING "unit_of_measure_abbreviation"::"text"::"public"."product_tree_unit_of_measure_abbreviation_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_unit_of_measure_abbreviation_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_initial_lab_testing_state_enum" RENAME TO "product_initial_lab_testing_state_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_tree_initial_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "initial_lab_testing_state" TYPE "public"."product_tree_initial_lab_testing_state_enum" USING "initial_lab_testing_state"::"text"::"public"."product_tree_initial_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_initial_lab_testing_state_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_lab_testing_state_enum" RENAME TO "product_lab_testing_state_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_tree_lab_testing_state_enum" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "lab_testing_state" TYPE "public"."product_tree_lab_testing_state_enum" USING "lab_testing_state"::"text"::"public"."product_tree_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_lab_testing_state_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD CONSTRAINT "FK_0a08c40bcce1e30d38b67f673f6" FOREIGN KEY ("parentId") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD CONSTRAINT "FK_06d88967c326210c4667ac0f5ad" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD CONSTRAINT "FK_4bae414fa401636cb9f3075bcfd" FOREIGN KEY ("thumbnail_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD CONSTRAINT "FK_20bf2d4c568a6daf57209113e5d" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree_closure" ADD CONSTRAINT "FK_20c75b5743c0c6abc15e523e493" FOREIGN KEY ("ancestor_id") REFERENCES "product_tree"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree_closure" ADD CONSTRAINT "FK_cd8525385fddd20b5164d562fcd" FOREIGN KEY ("descendant_id") REFERENCES "product_tree"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_tree_closure" DROP CONSTRAINT "FK_cd8525385fddd20b5164d562fcd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree_closure" DROP CONSTRAINT "FK_20c75b5743c0c6abc15e523e493"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP CONSTRAINT "FK_20bf2d4c568a6daf57209113e5d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP CONSTRAINT "FK_4bae414fa401636cb9f3075bcfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP CONSTRAINT "FK_06d88967c326210c4667ac0f5ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP CONSTRAINT "FK_0a08c40bcce1e30d38b67f673f6"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_lab_testing_state_enum_old" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "lab_testing_state" TYPE "public"."product_lab_testing_state_enum_old" USING "lab_testing_state"::"text"::"public"."product_lab_testing_state_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_tree_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_lab_testing_state_enum_old" RENAME TO "product_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_initial_lab_testing_state_enum_old" AS ENUM('NotSubmitted', 'SubmittedForTesting', 'TestFailed', 'TestPassed', 'TestingInProgress', 'AwaitingConfirmation', 'RetestFailed', 'RetestPassed', 'Remediated', 'SelectedForRandomTesting', 'NotRequired', 'ProcessValidated')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "initial_lab_testing_state" TYPE "public"."product_initial_lab_testing_state_enum_old" USING "initial_lab_testing_state"::"text"::"public"."product_initial_lab_testing_state_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_tree_initial_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_initial_lab_testing_state_enum_old" RENAME TO "product_initial_lab_testing_state_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_unit_of_measure_abbreviation_enum_old" AS ENUM('ea', 'oz', 'lb', 'g', 'mg', 'kg', 't')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "unit_of_measure_abbreviation" TYPE "public"."product_unit_of_measure_abbreviation_enum_old" USING "unit_of_measure_abbreviation"::"text"::"public"."product_unit_of_measure_abbreviation_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_tree_unit_of_measure_abbreviation_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_unit_of_measure_abbreviation_enum_old" RENAME TO "product_unit_of_measure_abbreviation_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_unit_of_measure_name_enum_old" AS ENUM('Each', 'Ounces', 'Pounds', 'Grams', 'Milligrams', 'Kilograms', 'Tonns')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "unit_of_measure_name" TYPE "public"."product_unit_of_measure_name_enum_old" USING "unit_of_measure_name"::"text"::"public"."product_unit_of_measure_name_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_tree_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_unit_of_measure_name_enum_old" RENAME TO "product_unit_of_measure_name_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_package_type_enum_old" AS ENUM('Product', 'ImmaturePlant', 'VegetativePlant', 'PlantWaste', 'HarvestWaste')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "package_type" TYPE "public"."product_package_type_enum_old" USING "package_type"::"text"::"public"."product_package_type_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_tree_package_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."product_package_type_enum_old" RENAME TO "product_package_type_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_status_enum_old" AS ENUM('new', 'listed', 'unlisted', 'archived')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "status" TYPE "public"."product_status_enum_old" USING "status"::"text"::"public"."product_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ALTER COLUMN "status" SET DEFAULT 'new'`,
    );
    await queryRunner.query(`DROP TYPE "public"."product_tree_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."product_status_enum_old" RENAME TO "product_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP COLUMN "parentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP COLUMN "source_package_labels"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd8525385fddd20b5164d562fc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_20c75b5743c0c6abc15e523e49"`,
    );
    await queryRunner.query(`DROP TABLE "product_tree_closure"`);
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD CONSTRAINT "FK_64785df36f923563795d325d68e" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD CONSTRAINT "FK_83c3b7a80f6fe1d5ad7fa05a2a2" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD CONSTRAINT "FK_5cd3c8b06d45e575517e8358033" FOREIGN KEY ("thumbnail_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
