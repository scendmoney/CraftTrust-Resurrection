import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701685538005 implements MigrationInterface {
    name = 'Migration1701685538005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_notification_contact_us" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_notification_join_facility" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "request" ADD "is_activated" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "request" ADD "code" character varying(20)`);
        await queryRunner.query(`ALTER TYPE "public"."request_status_enum" RENAME TO "request_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum" AS ENUM('new', 'processing', 'closed')`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" TYPE "public"."request_status_enum" USING "status"::"text"::"public"."request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" SET DEFAULT 'new'`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum_old" AS ENUM('closed', 'new')`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" TYPE "public"."request_status_enum_old" USING "status"::"text"::"public"."request_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" SET DEFAULT 'new'`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."request_status_enum_old" RENAME TO "request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "is_activated"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_notification_join_facility"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_notification_contact_us"`);
    }

}
