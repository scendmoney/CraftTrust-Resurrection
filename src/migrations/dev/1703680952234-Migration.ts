import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1703680952234 implements MigrationInterface {
    name = 'Migration1703680952234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "index" SERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "index"`);
    }

}
