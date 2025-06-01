import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696865376808 implements MigrationInterface {
    name = 'Migration1696865376808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "is_related" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "is_related"`);
    }

}
