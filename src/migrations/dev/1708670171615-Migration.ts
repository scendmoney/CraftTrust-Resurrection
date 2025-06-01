import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708670171615 implements MigrationInterface {
    name = 'Migration1708670171615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "quantity_active_employee" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "quantity_employee" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "quantity_employee"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "quantity_active_employee"`);
    }

}
