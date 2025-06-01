import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701270598188 implements MigrationInterface {
    name = 'Migration1701270598188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "products_sync_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD "sync_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" DROP COLUMN "sync_date"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "products_sync_date"`);
    }

}
