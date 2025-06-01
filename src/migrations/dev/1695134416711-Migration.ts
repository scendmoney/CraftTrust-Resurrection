import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1695134416711 implements MigrationInterface {
  name = 'Migration1695134416711';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('buyer', 'cultivator', 'admin', 'owner')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(255), "email" character varying(255) NOT NULL, "is_blocked" boolean NOT NULL DEFAULT false, "is_kyc" boolean NOT NULL DEFAULT false, "metrc_api_key" character varying(128) NOT NULL DEFAULT '', "public_address" character varying(128) NOT NULL DEFAULT '', "issuer" character varying(128) NOT NULL DEFAULT '', "phone_number" character varying(24) DEFAULT '', "role" "public"."user_role_enum" NOT NULL DEFAULT 'buyer', "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
