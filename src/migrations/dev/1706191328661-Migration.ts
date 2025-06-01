import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706191328661 implements MigrationInterface {
    name = 'Migration1706191328661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ADD "age" smallint`);
        await queryRunner.query(`CREATE TYPE "public"."survey_gender_enum" AS ENUM('Female', 'Male', 'Other')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "gender" "public"."survey_gender_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_often_consume_cannabis_enum" AS ENUM('Daily', 'Occassionally', 'VeryRarely')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "often_consume_cannabis" "public"."survey_often_consume_cannabis_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_primary_purpose_consumption_enum" AS ENUM('MentalHealth', 'PainRelief', 'Recreation')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "primary_purpose_consumption" "public"."survey_primary_purpose_consumption_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "appearance" smallint`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "bud_hairs_color" smallint`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "aroma_smells" smallint array`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "nose" smallint`);
        await queryRunner.query(`CREATE TYPE "public"."survey_flavor_taste_enum" AS ENUM('Harsh', 'Mild', 'Robust', 'Smooth')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "flavor_taste" "public"."survey_flavor_taste_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "flavor_taste_other" character varying(300)`);
        await queryRunner.query(`CREATE TYPE "public"."survey_experience_enum" AS ENUM('HeadyCreative', 'RelaxingPainRelieving')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "experience" "public"."survey_experience_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_stoney_is_it_enum" AS ENUM('Mild', 'VeryStoney')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "stoney_is_it" "public"."survey_stoney_is_it_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "tell_friend" smallint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "tell_friend"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "stoney_is_it"`);
        await queryRunner.query(`DROP TYPE "public"."survey_stoney_is_it_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "experience"`);
        await queryRunner.query(`DROP TYPE "public"."survey_experience_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "flavor_taste_other"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "flavor_taste"`);
        await queryRunner.query(`DROP TYPE "public"."survey_flavor_taste_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "nose"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "aroma_smells"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "bud_hairs_color"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "appearance"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "primary_purpose_consumption"`);
        await queryRunner.query(`DROP TYPE "public"."survey_primary_purpose_consumption_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "often_consume_cannabis"`);
        await queryRunner.query(`DROP TYPE "public"."survey_often_consume_cannabis_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."survey_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "age"`);
    }

}
