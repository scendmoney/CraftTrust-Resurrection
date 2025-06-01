import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708413114995 implements MigrationInterface {
    name = 'Migration1708413114995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_07c6c82781d105a680b5c265be" ON "facility" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_07c6c82781d105a680b5c265be"`);
    }

}
