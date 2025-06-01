import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710744866534 implements MigrationInterface {
    name = 'Migration1710744866534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "is_online" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_online"`);
    }

}
