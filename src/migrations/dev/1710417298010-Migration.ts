import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710417298010 implements MigrationInterface {
    name = 'Migration1710417298010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "address" character varying(255) DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "site" character varying(255) DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "youtube" character varying(255) DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "facebook" character varying(255) DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "twitter_x" character varying(255) DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "instagram" character varying(255) DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "instagram"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "twitter_x"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "facebook"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "youtube"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "site"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "address"`);
    }

}
