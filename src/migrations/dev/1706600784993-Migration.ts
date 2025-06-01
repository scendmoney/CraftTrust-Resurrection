import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706600784993 implements MigrationInterface {
    name = 'Migration1706600784993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_status_enum" AS ENUM('cancel', 'done', 'error', 'new', 'processing')`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('buy', 'deposit', 'withdrawal')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "status" "public"."transaction_status_enum" NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "is_wallet_balance" boolean NOT NULL DEFAULT false, "error" character varying, "order_id" integer, "facility_from" character varying(48), "facility_to" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "payment_wallet_status"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_wallet_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "payment_transaction_status"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_transaction_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "public_address"`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "index" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "public_address" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "public_address_decode" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ADD "transaction_blockchain_id" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "verification_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ADD "transaction_id" integer`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_9011283056620f5eaa7ad74cef6" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_bc71e3fd3c0549a25625bc03b46" FOREIGN KEY ("facility_from") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_ce1ffdd0323d5d99131c5bdbef0" FOREIGN KEY ("facility_to") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ADD CONSTRAINT "FK_d372feed22c89c79283824327ee" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" DROP CONSTRAINT "FK_d372feed22c89c79283824327ee"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_ce1ffdd0323d5d99131c5bdbef0"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_bc71e3fd3c0549a25625bc03b46"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_9011283056620f5eaa7ad74cef6"`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" ADD "transaction_id" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "verification_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction_blockchain" DROP COLUMN "transaction_blockchain_id"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "public_address_decode"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "public_address"`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "public_address" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "index" SERIAL NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_transaction_status_enum" AS ENUM('canceled', 'done', 'error', 'new', 'processing')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "payment_transaction_status" "public"."order_payment_transaction_status_enum" NOT NULL DEFAULT 'new'`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_wallet_status_enum" AS ENUM('canceled', 'done', 'error', 'new', 'processing')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "payment_wallet_status" "public"."order_payment_wallet_status_enum" NOT NULL DEFAULT 'new'`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_status_enum"`);
    }

}
