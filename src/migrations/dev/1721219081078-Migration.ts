import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721219081078 implements MigrationInterface {
    name = 'Migration1721219081078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "salt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "salt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "salt" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "salt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
    }

}
