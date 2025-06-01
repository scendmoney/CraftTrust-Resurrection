import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705414246188 implements MigrationInterface {
    name = 'Migration1705414246188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_blockchain_status_enum" AS ENUM('done', 'error')`);
        await queryRunner.query(`CREATE TABLE "transaction_blockchain" ("id" SERIAL NOT NULL, "status" "public"."transaction_blockchain_status_enum" NOT NULL, "gas_limit" integer NOT NULL DEFAULT '0', "gas_used" integer NOT NULL DEFAULT '0', "fee_hbar" numeric(20,20) NOT NULL DEFAULT '0', "fee" numeric(20,20) NOT NULL DEFAULT '0', "transaction_id" character varying(100) NOT NULL, "error" character varying, "error_code" integer, "order_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f10200cb74897cf8be64a018f7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_wallet_status_enum" AS ENUM('canceled', 'done', 'error', 'new', 'processing')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "payment_wallet_status" "public"."order_payment_wallet_status_enum" NOT NULL DEFAULT 'new'`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_transaction_status_enum" AS ENUM('canceled', 'done', 'error', 'new', 'processing')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "payment_transaction_status" "public"."order_payment_transaction_status_enum" NOT NULL DEFAULT 'new'`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ADD CONSTRAINT "FK_a1d4b86350cd613126214158754" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" DROP CONSTRAINT "FK_a1d4b86350cd613126214158754"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "payment_transaction_status"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_transaction_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "payment_wallet_status"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_wallet_status_enum"`);
        await queryRunner.query(`DROP TABLE "transaction_blockchain"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_blockchain_status_enum"`);
    }

}
