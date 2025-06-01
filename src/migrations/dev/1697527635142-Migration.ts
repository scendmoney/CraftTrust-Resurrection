import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697527635142 implements MigrationInterface {
  name = 'Migration1697527635142';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."product_status_enum" RENAME TO "product_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_status_enum" AS ENUM('draft', 'unpublished', 'published', 'archived')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" TYPE "public"."product_status_enum" USING "status"::"text"::"public"."product_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" SET DEFAULT 'draft'`,
    );
    await queryRunner.query(`DROP TYPE "public"."product_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."product_status_enum_old" AS ENUM('draft', 'unpublished', 'published')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" TYPE "public"."product_status_enum_old" USING "status"::"text"::"public"."product_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" SET DEFAULT 'draft'`,
    );
    await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."product_status_enum_old" RENAME TO "product_status_enum"`,
    );
  }
}
