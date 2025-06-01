import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721129671540 implements MigrationInterface {
    name = 'Migration1721129671540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_metrc" TYPE numeric(30,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity" TYPE numeric(30,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock" TYPE numeric(30,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_when_creation" TYPE numeric(30,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_when_creation" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_metrc" TYPE numeric(10,2)`);
    }

}
