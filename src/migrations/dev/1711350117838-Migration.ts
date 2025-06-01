import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711350117838 implements MigrationInterface {
    name = 'Migration1711350117838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "is_activated_sync_job" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_activated_sync_job"`);
    }

}
