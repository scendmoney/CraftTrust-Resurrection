import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697016382843 implements MigrationInterface {
  name = 'Migration1697016382843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_2f46d93cec492d987e88e066f96"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."facility_to_facilities_type_enum" AS ENUM('owned', 'related')`,
    );
    await queryRunner.query(
      `CREATE TABLE "facility_to_facilities" ("id" SERIAL NOT NULL, "type" "public"."facility_to_facilities_type_enum" NOT NULL DEFAULT 'owned', "facility_id" character varying(48) NOT NULL, "facility_id_rel" character varying(48) NOT NULL, CONSTRAINT "PK_1b754dbb1e9b99a5f11ce44ef71" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_d4c7499e02561e4ab6c5d061799"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP COLUMN "type"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_to_facilities_type_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "asset" ADD "product_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_d18a6c052c34da34c81612e6f72" PRIMARY KEY ("user_id", "facility_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe3e233a3057f433fa0eff473c" ON "user_to_facilities" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2f46d93cec492d987e88e066f9" ON "user_to_facilities" ("facility_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facilities" ADD CONSTRAINT "FK_04ca1ad132afa7e0b3741dd86f8" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facilities" ADD CONSTRAINT "FK_5aed3293d27658a2b54a1191027" FOREIGN KEY ("facility_id_rel") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD CONSTRAINT "FK_980f83643b37cdae0d37df0c3e8" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_2f46d93cec492d987e88e066f96" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE "asset" DROP CONSTRAINT "FK_980f83643b37cdae0d37df0c3e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facilities" DROP CONSTRAINT "FK_5aed3293d27658a2b54a1191027"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facilities" DROP CONSTRAINT "FK_04ca1ad132afa7e0b3741dd86f8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2f46d93cec492d987e88e066f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe3e233a3057f433fa0eff473c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_d18a6c052c34da34c81612e6f72"`,
    );
    await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "product_id"`);
    await queryRunner.query(
      `CREATE TYPE "public"."user_to_facilities_type_enum" AS ENUM('owned', 'related')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD "type" "public"."user_to_facilities_type_enum" NOT NULL DEFAULT 'owned'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_d4c7499e02561e4ab6c5d061799" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`DROP TABLE "facility_to_facilities"`);
    await queryRunner.query(
      `DROP TYPE "public"."facility_to_facilities_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_2f46d93cec492d987e88e066f96" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
