import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706780230964 implements MigrationInterface {
    name = 'Migration1706780230964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "order_total_spend" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "avg_purchase" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "is_net_activated" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "net_days" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "net_balance" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "due_balance" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "due_balance"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "net_balance"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "net_days"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "is_net_activated"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "avg_purchase"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "order_total_spend"`);
    }

}
