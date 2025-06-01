import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1722937724878 implements MigrationInterface {
    name = 'Migration1722937724878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_8733928ac5eebe45bdcbcc80d36"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "product_id" integer`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_8733928ac5eebe45bdcbcc80d36" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
