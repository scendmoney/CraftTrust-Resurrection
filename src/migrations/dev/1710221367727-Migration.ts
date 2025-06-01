import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710221367727 implements MigrationInterface {
    name = 'Migration1710221367727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "phone_number" character varying(24)`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "email" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "phone_number"`);
    }

}
