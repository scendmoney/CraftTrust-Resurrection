import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719994299896 implements MigrationInterface {
    name = 'Migration1719994299896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_diamondstandard_status_enum" AS ENUM('QUOTE', 'REQUEST_INITIATED', 'INVALID_REQUEST', 'CARAT_TRANSFER_INITIATED', 'CARAT_TRANSFER_COMPLETED', 'CARAT_TRANSFER_FAILED', 'REQUEST_PROCESSED', 'REQUEST_REJECTED', 'REQUEST_CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "diamondstandard_status" "public"."transaction_diamondstandard_status_enum"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "diamondstandard_sell_reference" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "size" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "balance" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "balance_processing_withdraw" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "balance_processing_withdraw"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "diamondstandard_sell_reference"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "diamondstandard_status"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_diamondstandard_status_enum"`);
    }

}
