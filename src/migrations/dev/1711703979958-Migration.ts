import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711703979958 implements MigrationInterface {
    name = 'Migration1711703979958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft" ADD "logo_url" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "index" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP COLUMN "logo_url"`);
    }

}
