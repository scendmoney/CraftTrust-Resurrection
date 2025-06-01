import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705662118900 implements MigrationInterface {
    name = 'Migration1705662118900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_7aa27445a1d4002dc9df5f18cc3"`);
        await queryRunner.query(`CREATE TABLE "subcompany" ("id" SERIAL NOT NULL, "quantity" numeric(10,2) NOT NULL DEFAULT '0', "quantity_sold" numeric(10,2) NOT NULL DEFAULT '0', "facility_buyer_id" character varying(48), "company_id" integer NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "CHK_3997d3ca3051295fbcde19180d" CHECK ("quantity" >= 0), CONSTRAINT "CHK_834c5bd3adc18b65661893792d" CHECK ("quantity_sold" >= 0), CONSTRAINT "PK_da4a181c492ef44f7b9cb7f59b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "subcompany" ADD CONSTRAINT "FK_cc3d2db0815214f662dcce016f2" FOREIGN KEY ("facility_buyer_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcompany" ADD CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcompany" DROP CONSTRAINT "FK_e9e81b5d11d8ed5f321d3d36f06"`);
        await queryRunner.query(`ALTER TABLE "subcompany" DROP CONSTRAINT "FK_cc3d2db0815214f662dcce016f2"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "parent_id" integer`);
        await queryRunner.query(`DROP TABLE "subcompany"`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_7aa27445a1d4002dc9df5f18cc3" FOREIGN KEY ("parent_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
