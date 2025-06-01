import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705589491322 implements MigrationInterface {
    name = 'Migration1705589491322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."company_status_enum" AS ENUM('Active', 'Inactive', 'Draft', 'Archived', 'Pending')`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "date_start" date NOT NULL, "date_end" date NOT NULL, "status" "public"."company_status_enum" NOT NULL DEFAULT 'Draft', "facility_cultivator_id" character varying(48) NOT NULL, "product_id" integer, "parent_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_40ba13327d1e116a1f6bb19b51a" FOREIGN KEY ("facility_cultivator_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_d1efdbeb2c3b018427ed0b02b3d" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_7aa27445a1d4002dc9df5f18cc3" FOREIGN KEY ("parent_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_7aa27445a1d4002dc9df5f18cc3"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_d1efdbeb2c3b018427ed0b02b3d"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_40ba13327d1e116a1f6bb19b51a"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TYPE "public"."company_status_enum"`);
    }

}
