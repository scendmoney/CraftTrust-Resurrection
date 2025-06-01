import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706179269467 implements MigrationInterface {
    name = 'Migration1706179269467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subcompany_to_survey" ("subcompany_id" integer NOT NULL, "survey_id" integer NOT NULL, CONSTRAINT "PK_8f84fdb7bbee21f71947e18ef2b" PRIMARY KEY ("subcompany_id", "survey_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_54c80a9808af1015db10215f07" ON "subcompany_to_survey" ("subcompany_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_99b7f9956c55701a3c5381986c" ON "subcompany_to_survey" ("survey_id") `);
        await queryRunner.query(`ALTER TABLE "survey" ADD "fullname" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "phone" character varying(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "is_activated" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "is_buyer_confirm" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "uuid" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "code" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "code_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "subcompany_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_a6685ffd34936d08f65d9272f2f" FOREIGN KEY ("subcompany_id") REFERENCES "subcompany"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcompany_to_survey" ADD CONSTRAINT "FK_54c80a9808af1015db10215f07c" FOREIGN KEY ("subcompany_id") REFERENCES "subcompany"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subcompany_to_survey" ADD CONSTRAINT "FK_99b7f9956c55701a3c5381986c8" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcompany_to_survey" DROP CONSTRAINT "FK_99b7f9956c55701a3c5381986c8"`);
        await queryRunner.query(`ALTER TABLE "subcompany_to_survey" DROP CONSTRAINT "FK_54c80a9808af1015db10215f07c"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_a6685ffd34936d08f65d9272f2f"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "subcompany_id"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "code_date"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "is_buyer_confirm"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "is_activated"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "fullname"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99b7f9956c55701a3c5381986c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54c80a9808af1015db10215f07"`);
        await queryRunner.query(`DROP TABLE "subcompany_to_survey"`);
    }

}
