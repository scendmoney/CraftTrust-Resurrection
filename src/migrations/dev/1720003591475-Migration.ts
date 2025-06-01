import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720003591475 implements MigrationInterface {
    name = 'Migration1720003591475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "size" TO "diamondstandard_request_id"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "diamondstandard_request_id" TO "size"`);
    }

}
