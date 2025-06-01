import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719408430423 implements MigrationInterface {
    name = 'Migration1719408430423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "amount_usd" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "token_rate" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "token_rate"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "amount_usd"`);
    }

}
