import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711616472433 implements MigrationInterface {
    name = 'Migration1711616472433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ADD "user_id" character varying(48)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'client', 'admin_platform', 'owner_platform')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2265a75ef87d0f38fbbacfbfaf" ON "user" ("phone_number") WHERE phone_number IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9e3516cf97a57b6f6199fa95a8" ON "user" ("email") WHERE email IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_a37da0d039df5145bd187a32e09" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_a37da0d039df5145bd187a32e09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e3516cf97a57b6f6199fa95a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2265a75ef87d0f38fbbacfbfaf"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('admin_platform', 'owner_platform', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "user_id"`);
    }

}
