import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706172935410 implements MigrationInterface {
    name = 'Migration1706172935410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "date_end" DROP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."company_status_enum" RENAME TO "company_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."company_status_enum" AS ENUM('Active', 'Draft', 'Archived', 'Pending', 'Rejected', 'Completed')`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "status" TYPE "public"."company_status_enum" USING "status"::"text"::"public"."company_status_enum"`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "status" SET DEFAULT 'Draft'`);
        await queryRunner.query(`DROP TYPE "public"."company_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."company_status_enum_old" AS ENUM('Active', 'Inactive', 'Draft', 'Archived', 'Pending', 'Rejected')`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "status" TYPE "public"."company_status_enum_old" USING "status"::"text"::"public"."company_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "status" SET DEFAULT 'Draft'`);
        await queryRunner.query(`DROP TYPE "public"."company_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."company_status_enum_old" RENAME TO "company_status_enum"`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "date_end" SET NOT NULL`);
    }

}
