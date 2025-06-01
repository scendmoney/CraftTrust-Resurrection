import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713341915532 implements MigrationInterface {
    name = 'Migration1713341915532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "car" TO "comments"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "comments" TO "car"`);
    }

}
