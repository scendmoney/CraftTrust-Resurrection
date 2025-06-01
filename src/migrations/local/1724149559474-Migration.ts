import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724149559474 implements MigrationInterface {
    name = 'Migration1724149559474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_2265a75ef87d0f38fbbacfbfaf"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USER_PHONE_NUMBER_UNIQUE" ON "user" ("phone_number") WHERE phone_number IS NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_PHONE_NUMBER_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2265a75ef87d0f38fbbacfbfaf" ON "user" ("phone_number") WHERE (phone_number IS NOT NULL)`);
    }

}
