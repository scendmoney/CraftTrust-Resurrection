import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700047572534 implements MigrationInterface {
    name = 'Migration1700047572534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ADD "lab_test_documents" character varying(100) array`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_metrc" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock" TYPE numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock" TYPE numeric(5,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" TYPE numeric(5,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity" TYPE numeric(5,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_metrc" TYPE numeric(5,2)`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP COLUMN "lab_test_documents"`);
    }

}
