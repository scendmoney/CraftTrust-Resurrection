import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714116238129 implements MigrationInterface {
    name = 'Migration1714116238129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft" ADD "properties" json NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "nft" DROP COLUMN "properties"`);
    }

}
