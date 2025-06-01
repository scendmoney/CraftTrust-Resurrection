import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700814379668 implements MigrationInterface {
    name = 'Migration1700814379668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ADD "total_thc" numeric(4,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD "total_cbd" numeric(4,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" DROP COLUMN "total_cbd"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP COLUMN "total_thc"`);
    }

}
