import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1722506441523 implements MigrationInterface {
    name = 'Migration1722506441523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`ALTER TABLE "code" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "code" ADD "ip_address" character varying(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "code" ADD "ip_address" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
    }

}
