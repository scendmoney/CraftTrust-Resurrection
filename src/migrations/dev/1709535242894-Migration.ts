import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709535242894 implements MigrationInterface {
    name = 'Migration1709535242894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcompany" DROP CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06"`);
        await queryRunner.query(`ALTER TABLE "subcompany" ADD CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcompany" DROP CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06"`);
        await queryRunner.query(`ALTER TABLE "subcompany" ADD CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
