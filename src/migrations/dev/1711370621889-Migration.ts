import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711370621889 implements MigrationInterface {
    name = 'Migration1711370621889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "CHK_00692cf20a56bb7d5bc9934912"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "CHK_00692cf20a56bb7d5bc9934912" CHECK ((quantity_metrc >= (0)::numeric))`);
    }

}
