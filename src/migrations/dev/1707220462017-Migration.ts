import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707220462017 implements MigrationInterface {
    name = 'Migration1707220462017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "product_survey_id" integer`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_15d076fe237df620ca1caad22c3" FOREIGN KEY ("product_survey_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_15d076fe237df620ca1caad22c3"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "product_survey_id"`);
    }

}
