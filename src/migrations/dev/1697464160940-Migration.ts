import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697464160940 implements MigrationInterface {
    name = 'Migration1697464160940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
    }

}
