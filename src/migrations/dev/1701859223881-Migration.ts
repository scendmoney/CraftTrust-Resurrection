import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701859223881 implements MigrationInterface {
    name = 'Migration1701859223881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "message_reject" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."request_status_enum" RENAME TO "request_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum" AS ENUM('new', 'processing', 'closed', 'approved', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" TYPE "public"."request_status_enum" USING "status"::"text"::"public"."request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" SET DEFAULT 'new'`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum_old" AS ENUM('closed', 'new', 'processing')`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" TYPE "public"."request_status_enum_old" USING "status"::"text"::"public"."request_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" SET DEFAULT 'new'`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."request_status_enum_old" RENAME TO "request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "message_reject"`);
    }

}
