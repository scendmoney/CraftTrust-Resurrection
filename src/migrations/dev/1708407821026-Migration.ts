import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708407821026 implements MigrationInterface {
    name = 'Migration1708407821026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_06d88967c326210c4667ac0f5a" ON "product_tree" ("facility_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_cace4a159ff9f2512dd4237376"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06d88967c326210c4667ac0f5a"`);
    }

}
