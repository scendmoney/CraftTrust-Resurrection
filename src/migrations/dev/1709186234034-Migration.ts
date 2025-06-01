import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709186234034 implements MigrationInterface {
    name = 'Migration1709186234034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "uuid" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "is_cripto_transfer" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "issuer" character varying(155)`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "country" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "last4" character varying(4)`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "scheme" character varying(15)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "scheme"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "last4"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "issuer"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "is_cripto_transfer"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "uuid"`);
    }

}
