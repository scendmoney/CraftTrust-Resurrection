import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710756082046 implements MigrationInterface {
    name = 'Migration1710756082046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "is_license_active" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_license_active" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_license_active"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_license_active"`);
    }

}
