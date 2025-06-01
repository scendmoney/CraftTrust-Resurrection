import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711440242303 implements MigrationInterface {
    name = 'Migration1711440242303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "CHK_63a7fee3a0bb399055767e6a5b"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "unit_weight" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "company" ADD "total_gram" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" ADD "total_lb" numeric(10,5) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "CHK_333591b84a1631928093a4705f" CHECK ("unit_weight" > 0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "CHK_333591b84a1631928093a4705f"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "total_lb"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "total_gram"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "unit_weight"`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "CHK_63a7fee3a0bb399055767e6a5b" CHECK ((quantity_sold >= 0))`);
    }

}
