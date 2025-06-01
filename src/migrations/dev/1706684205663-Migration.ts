import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706684205663 implements MigrationInterface {
    name = 'Migration1706684205663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "is_wallet_balance"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "total" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" ADD "last_order_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "last_order_date"`);
        await queryRunner.query(`ALTER TABLE "facility_to_facility" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "is_wallet_balance" boolean NOT NULL DEFAULT false`);
    }

}
