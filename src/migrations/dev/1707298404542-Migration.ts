import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707298404542 implements MigrationInterface {
    name = 'Migration1707298404542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "product_sold"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" ADD "quantity_sold" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "CHK_bae4c608aeaefa31ec2ca183e8" CHECK ("quantity" >= 0)`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "CHK_63a7fee3a0bb399055767e6a5b" CHECK ("quantity_sold" >= 0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "CHK_63a7fee3a0bb399055767e6a5b"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "CHK_bae4c608aeaefa31ec2ca183e8"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "quantity_sold"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "product_sold" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

}
