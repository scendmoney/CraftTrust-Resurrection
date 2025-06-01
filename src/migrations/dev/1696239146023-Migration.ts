import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696239146023 implements MigrationInterface {
  name = 'Migration1696239146023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "facility" ("id" character varying(24) NOT NULL, "name" character varying(255) NOT NULL, "alias" character varying(255) NOT NULL, "display_name" character varying(255) NOT NULL, "description" text, "credentialed_date" date NOT NULL DEFAULT now(), "metrc_api_key" character varying(128) NOT NULL DEFAULT '', "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, "license_number" character varying(32) NOT NULL, "license_start_date" date NOT NULL DEFAULT now(), "license_end_date" date NOT NULL DEFAULT now(), "license_type" character varying(64) NOT NULL, CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_status_enum" AS ENUM('draft', 'unpublished', 'published')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."product_status_enum" NOT NULL DEFAULT 'draft', "label" character varying NOT NULL, "package_type" character varying NOT NULL, "source_harvest_count" integer NOT NULL DEFAULT '0', "source_package_count" integer NOT NULL DEFAULT '0', "source_processing_job_count" integer NOT NULL DEFAULT '0', "location_id" integer, "location_name" character varying, "location_type_name" character varying, "quantity" integer NOT NULL DEFAULT '0', "unit_of_measure_name" character varying, "unit_of_measure_abbreviation" character varying, "packaged_date" date NOT NULL, "initial_lab_testing_state" character varying NOT NULL, "lab_testing_state" character varying NOT NULL, "lab_testing_state_date" date NOT NULL, "is_on_hold" boolean NOT NULL DEFAULT false, "is_on_trip" boolean NOT NULL DEFAULT false, "is_on_retailer_delivery" boolean NOT NULL DEFAULT false, "last_modified" TIMESTAMP WITH TIME ZONE NOT NULL, "facility_id" character varying(24), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_type_enum" AS ENUM('image', 'logo')`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset" ("id" SERIAL NOT NULL, "type" "public"."asset_type_enum" NOT NULL DEFAULT 'logo', "hashname" character varying(100) NOT NULL, "filename" character varying(150) NOT NULL, "mimetype" character varying(100) NOT NULL, "path" character varying(255) NOT NULL, "size" integer NOT NULL DEFAULT '0', "width" integer NOT NULL DEFAULT '0', "height" integer NOT NULL DEFAULT '0', "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ac8a52a96c145ccc9862ef50e7" ON "asset" ("id", "hashname") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_to_facilities" ("user_id" character varying(24) NOT NULL, "facility_id" character varying(24) NOT NULL, CONSTRAINT "PK_d18a6c052c34da34c81612e6f72" PRIMARY KEY ("user_id", "facility_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe3e233a3057f433fa0eff473c" ON "user_to_facilities" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2f46d93cec492d987e88e066f9" ON "user_to_facilities" ("facility_id") `,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "metrc_api_key"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "fullname" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "license_number" character varying(32) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "license_start_date" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "license_end_date" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "license_type" character varying(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" character varying(24) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "public_address" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "public_address" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "issuer" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "issuer" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone_number" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('buyer', 'cultivator', 'employee', 'admin', 'owner')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'buyer'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_64785df36f923563795d325d68e" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_2f46d93cec492d987e88e066f96" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_2f46d93cec492d987e88e066f96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_64785df36f923563795d325d68e"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum_old" AS ENUM('buyer', 'cultivator', 'admin', 'owner')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'buyer'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone_number" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "issuer" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "issuer" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "public_address" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "public_address" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "license_type"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "license_end_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "license_start_date"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "license_number"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullname"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "metrc_api_key" character varying(128) NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying(255)`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2f46d93cec492d987e88e066f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe3e233a3057f433fa0eff473c"`,
    );
    await queryRunner.query(`DROP TABLE "user_to_facilities"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ac8a52a96c145ccc9862ef50e7"`,
    );
    await queryRunner.query(`DROP TABLE "asset"`);
    await queryRunner.query(`DROP TYPE "public"."asset_type_enum"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
    await queryRunner.query(`DROP TABLE "facility"`);
  }
}
