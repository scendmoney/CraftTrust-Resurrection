import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706856301022 implements MigrationInterface {
    name = 'Migration1706856301022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "due_balance"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "due_balance" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "due_balance"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "due_balance" integer NOT NULL DEFAULT '0'`);
    }

}
