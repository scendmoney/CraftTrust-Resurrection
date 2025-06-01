import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707221229601 implements MigrationInterface {
    name = 'Migration1707221229601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_15d076fe237df620ca1caad22c3"`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "product_survey_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_15d076fe237df620ca1caad22c3" FOREIGN KEY ("product_survey_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_15d076fe237df620ca1caad22c3"`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "product_survey_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_15d076fe237df620ca1caad22c3" FOREIGN KEY ("product_survey_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
