import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712746454336 implements MigrationInterface {
    name = 'Migration1712746454336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "total_buyer" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" ADD "total_cultivator" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" ADD "is_cultivator_fee_paid" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "order" ADD "fee_buyer" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" ADD "fee_cultivator" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "fee_buyer" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "fee_cultivator" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "total" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "fee" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "cost_products" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "cost_products"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "fee"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "fee_cultivator"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "fee_buyer"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "fee_cultivator"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "fee_buyer"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "is_cultivator_fee_paid"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total_cultivator"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total_buyer"`);
    }

}
