import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711434725157 implements MigrationInterface {
    name = 'Migration1711434725157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "total_people_registered" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" ADD "total_people_completed" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" ADD "total_people_redemption" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "total_people_redemption"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "total_people_completed"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "total_people_registered"`);
    }

}
