import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707907204446 implements MigrationInterface {
    name = 'Migration1707907204446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_a6685ffd34936d08f65d9272f2f"`);
        await queryRunner.query(`ALTER TABLE "subcompany" DROP CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_a6685ffd34936d08f65d9272f2f" FOREIGN KEY ("subcompany_id") REFERENCES "subcompany"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcompany" ADD CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcompany" DROP CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_a6685ffd34936d08f65d9272f2f"`);
        await queryRunner.query(`ALTER TABLE "subcompany" ADD CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_a6685ffd34936d08f65d9272f2f" FOREIGN KEY ("subcompany_id") REFERENCES "subcompany"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
