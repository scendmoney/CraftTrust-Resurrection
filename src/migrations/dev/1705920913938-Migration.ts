import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705920913938 implements MigrationInterface {
    name = 'Migration1705920913938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_to_product" ("company_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_5b1d2a2f4118bc5de50100a35ef" PRIMARY KEY ("company_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91c6fbe3cabaee010e169ce485" ON "company_to_product" ("company_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd72870df6ea37d2bed971246c" ON "company_to_product" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "company_to_product" ADD CONSTRAINT "FK_91c6fbe3cabaee010e169ce485c" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_to_product" ADD CONSTRAINT "FK_bd72870df6ea37d2bed971246c2" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_to_product" DROP CONSTRAINT "FK_bd72870df6ea37d2bed971246c2"`);
        await queryRunner.query(`ALTER TABLE "company_to_product" DROP CONSTRAINT "FK_91c6fbe3cabaee010e169ce485c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd72870df6ea37d2bed971246c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91c6fbe3cabaee010e169ce485"`);
        await queryRunner.query(`DROP TABLE "company_to_product"`);
    }

}
