import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711111003529 implements MigrationInterface {
    name = 'Migration1711111003529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcompany" ADD "is_survey_pending" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcompany" DROP COLUMN "is_survey_pending"`);
    }

}
