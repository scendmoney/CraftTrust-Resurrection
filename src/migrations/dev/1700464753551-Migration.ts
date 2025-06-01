import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700464753551 implements MigrationInterface {
    name = 'Migration1700464753551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ADD "genetic_cross" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" DROP COLUMN "genetic_cross"`);
    }

}
