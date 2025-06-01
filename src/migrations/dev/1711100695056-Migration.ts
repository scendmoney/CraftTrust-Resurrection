import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711100695056 implements MigrationInterface {
    name = 'Migration1711100695056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "company_name" character varying(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "company_name"`);
    }

}
