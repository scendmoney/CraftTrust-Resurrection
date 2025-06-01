import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700226716018 implements MigrationInterface {
    name = 'Migration1700226716018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ADD "terpenes" character varying array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" DROP COLUMN "terpenes"`);
    }

}
