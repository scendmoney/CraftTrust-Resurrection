import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706259456068 implements MigrationInterface {
    name = 'Migration1706259456068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "is_activated"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "is_buyer_confirm"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "survey_done_date"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_status_enum" AS ENUM('New', 'Activated', 'BuyerConfirmed', 'SurvaySent', 'Done')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "status" "public"."survey_status_enum" NOT NULL DEFAULT 'New'`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "activated_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "buyer_confirmed_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "survey_sent_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "completed_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "completed_date"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "survey_sent_date"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "buyer_confirmed_date"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "activated_date"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."survey_status_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "survey_done_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "is_buyer_confirm" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "is_activated" boolean NOT NULL DEFAULT false`);
    }

}
