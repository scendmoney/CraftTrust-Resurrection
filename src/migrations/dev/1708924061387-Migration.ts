import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708924061387 implements MigrationInterface {
    name = 'Migration1708924061387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "amount_out" numeric(18,8) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "token" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "token_out" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_type_enum" RENAME TO "transaction_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('buy', 'deposit', 'swap', 'withdrawal')`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "type" TYPE "public"."transaction_type_enum" USING "type"::"text"::"public"."transaction_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum_old" AS ENUM('buy', 'deposit', 'withdrawal')`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "type" TYPE "public"."transaction_type_enum_old" USING "type"::"text"::"public"."transaction_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_type_enum_old" RENAME TO "transaction_type_enum"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "token_out"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "amount_out"`);
    }

}
