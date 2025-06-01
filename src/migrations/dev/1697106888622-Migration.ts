import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697106888622 implements MigrationInterface {
  name = 'Migration1697106888622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE facility_to_facilities CASCADE');
    await queryRunner.query('TRUNCATE TABLE user_to_facilities CASCADE');
    await queryRunner.query('TRUNCATE TABLE product_to_assets CASCADE');
    await queryRunner.query('TRUNCATE TABLE product CASCADE');
    await queryRunner.query('TRUNCATE TABLE facility CASCADE');
    // await queryRunner.query('TRUNCATE TABLE asset');
    await queryRunner.query('TRUNCATE TABLE "user" CASCADE');

    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_2f46d93cec492d987e88e066f96"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."facility_role_enum" AS ENUM('buyer', 'cultivator')`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "role" "public"."facility_role_enum" NOT NULL DEFAULT 'buyer'`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "user_contact_id" character varying(48)`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('employee', 'admin', 'owner', 'admin_platform', 'owner_platform')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'employee'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "facility" ADD CONSTRAINT "FK_9fed65f0d0be127919394286027" FOREIGN KEY ("user_contact_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "facility" DROP CONSTRAINT "FK_9fed65f0d0be127919394286027"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum_old" AS ENUM('buyer', 'cultivator', 'employee', 'admin', 'owner')`,
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
      `ALTER TABLE "facility" DROP COLUMN "user_contact_id"`,
    );
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."facility_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_2f46d93cec492d987e88e066f96" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
