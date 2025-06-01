import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707213060418 implements MigrationInterface {
    name = 'Migration1707213060418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite" RENAME COLUMN "is_activated" TO "status"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."invite_status_enum" AS ENUM('processing', 'approved', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "invite" ADD "status" "public"."invite_status_enum" NOT NULL DEFAULT 'processing'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."invite_status_enum"`);
        await queryRunner.query(`ALTER TABLE "invite" ADD "status" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "invite" RENAME COLUMN "status" TO "is_activated"`);
    }

}
