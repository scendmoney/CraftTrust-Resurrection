import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706253726805 implements MigrationInterface {
    name = 'Migration1706253726805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ADD "survey_done_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "survey_done_date"`);
    }

}
