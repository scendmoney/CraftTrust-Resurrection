import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702891003013 implements MigrationInterface {
    name = 'Migration1702891003013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "ipfs" character varying`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "ipfs" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "ipfs"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "ipfs"`);
    }

}
