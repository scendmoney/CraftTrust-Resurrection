import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697802873590 implements MigrationInterface {
  name = 'Migration1697802873590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "owner_id" character varying(48)`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin_platform', 'owner_platform')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "facility" ADD CONSTRAINT "FK_1da8b970b48ac510a14be5d9fc9" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility" DROP CONSTRAINT "FK_1da8b970b48ac510a14be5d9fc9"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum_old" AS ENUM('employee', 'admin', 'owner', 'admin_platform', 'owner_platform')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'employee'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "owner_id"`);
  }
}
