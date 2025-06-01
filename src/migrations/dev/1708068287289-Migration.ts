import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708068287289 implements MigrationInterface {
    name = 'Migration1708068287289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_2ae75e3ae7b509aa6dd84f8bd3e"`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "parent_product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_2ae75e3ae7b509aa6dd84f8bd3e" FOREIGN KEY ("parent_product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_2ae75e3ae7b509aa6dd84f8bd3e"`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "parent_product_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_2ae75e3ae7b509aa6dd84f8bd3e" FOREIGN KEY ("parent_product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
