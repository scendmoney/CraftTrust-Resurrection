import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711353655363 implements MigrationInterface {
    name = 'Migration1711353655363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "full_address" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "country" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "city" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "zip" integer`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "google_place_id" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "facility" ALTER COLUMN "address" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ALTER COLUMN "address" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "google_place_id"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "full_address"`);
    }

}
