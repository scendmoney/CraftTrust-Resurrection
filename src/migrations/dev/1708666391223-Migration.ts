import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708666391223 implements MigrationInterface {
    name = 'Migration1708666391223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "company_name" character varying(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "company_name"`);
    }

}
