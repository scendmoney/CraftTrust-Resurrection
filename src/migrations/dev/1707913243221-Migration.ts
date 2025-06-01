import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707913243221 implements MigrationInterface {
    name = 'Migration1707913243221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "join_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "join_date"`);
    }

}
