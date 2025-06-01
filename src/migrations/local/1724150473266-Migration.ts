import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724150473266 implements MigrationInterface {
    name = 'Migration1724150473266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9e3516cf97a57b6f6199fa95a8"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USER_EMAIL_UNIQUE" ON "user" ("email") WHERE email IS NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_EMAIL_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9e3516cf97a57b6f6199fa95a8" ON "user" ("email") WHERE (email IS NOT NULL)`);
    }

}
