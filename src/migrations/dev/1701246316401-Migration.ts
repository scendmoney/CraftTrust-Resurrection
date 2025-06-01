import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701246316401 implements MigrationInterface {
    name = 'Migration1701246316401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ADD "quantity_when_creation" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" DROP COLUMN "quantity_when_creation"`);
    }

}
