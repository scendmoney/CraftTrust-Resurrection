import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711107300199 implements MigrationInterface {
    name = 'Migration1711107300199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "campaign_email" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "campaign_email"`);
    }

}
