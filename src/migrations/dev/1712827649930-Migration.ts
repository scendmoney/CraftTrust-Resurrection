import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712827649930 implements MigrationInterface {
    name = 'Migration1712827649930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "is_cultivator_fee_paid"`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ALTER COLUMN "fee_hbar" TYPE numeric(20,10)`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ALTER COLUMN "fee" TYPE numeric(20,10)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ALTER COLUMN "fee" TYPE numeric(20,20)`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ALTER COLUMN "fee_hbar" TYPE numeric(20,20)`);
        await queryRunner.query(`ALTER TABLE "order" ADD "is_cultivator_fee_paid" boolean NOT NULL DEFAULT false`);
    }

}
