import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711694319751 implements MigrationInterface {
    name = 'Migration1711694319751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."nft_primary_purpose_enum" AS ENUM('other', 'survey')`);
        await queryRunner.query(`CREATE TYPE "public"."nft_status_enum" AS ENUM('processing', 'done', 'error')`);
        await queryRunner.query(`CREATE TABLE "nft" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, "primary_purpose" "public"."nft_primary_purpose_enum" NOT NULL DEFAULT 'other', "status" "public"."nft_status_enum" NOT NULL DEFAULT 'processing', "ipfs" character varying, "token_id" character varying, "serial" integer, "count_error" integer NOT NULL DEFAULT '0', "survey_id" integer, "blockchain_transaction_id" integer, "user_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_82372eb067d6dd351f224e7ae7" UNIQUE ("survey_id"), CONSTRAINT "PK_8f46897c58e23b0e7bf6c8e56b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "public_address" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "public_address_decode" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`ALTER TABLE "nft" ADD CONSTRAINT "FK_82372eb067d6dd351f224e7ae7f" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nft" ADD CONSTRAINT "FK_e34636adb2dd376cd30ab1d987a" FOREIGN KEY ("blockchain_transaction_id") REFERENCES "transaction_blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nft" ADD CONSTRAINT "FK_5c9c2fd34e6b1ed340e8cb3e0c9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_5c9c2fd34e6b1ed340e8cb3e0c9"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_e34636adb2dd376cd30ab1d987a"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_82372eb067d6dd351f224e7ae7f"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "public_address_decode"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "public_address"`);
        await queryRunner.query(`DROP TABLE "nft"`);
        await queryRunner.query(`DROP TYPE "public"."nft_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."nft_primary_purpose_enum"`);
    }

}
