import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1698231523690 implements MigrationInterface {
  name = 'Migration1698231523690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite" ADD "employee_id" character varying(48)`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."invite_type_enum" RENAME TO "invite_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."invite_type_enum" AS ENUM('buyer', 'employee')`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ALTER COLUMN "type" TYPE "public"."invite_type_enum" USING "type"::"text"::"public"."invite_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."invite_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_6a02e54f58e4aa0104db8ea746d" FOREIGN KEY ("employee_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_6a02e54f58e4aa0104db8ea746d"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."invite_type_enum_old" AS ENUM('buyer')`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ALTER COLUMN "type" TYPE "public"."invite_type_enum_old" USING "type"::"text"::"public"."invite_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."invite_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."invite_type_enum_old" RENAME TO "invite_type_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "employee_id"`);
  }
}
