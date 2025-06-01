import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699879267173 implements MigrationInterface {
    name = 'Migration1699879267173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."facility_role_enum" RENAME TO "facility_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."facility_role_enum" AS ENUM('buyer', 'cultivator', 'buyerAndCultivator')`);
        await queryRunner.query(`ALTER TABLE "facility" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "facility" ALTER COLUMN "role" TYPE "public"."facility_role_enum" USING "role"::"text"::"public"."facility_role_enum"`);
        await queryRunner.query(`ALTER TABLE "facility" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`DROP TYPE "public"."facility_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."facility_role_enum_old" AS ENUM('buyer', 'cultivator')`);
        await queryRunner.query(`ALTER TABLE "facility" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "facility" ALTER COLUMN "role" TYPE "public"."facility_role_enum_old" USING "role"::"text"::"public"."facility_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "facility" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`DROP TYPE "public"."facility_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."facility_role_enum_old" RENAME TO "facility_role_enum"`);
    }

}
