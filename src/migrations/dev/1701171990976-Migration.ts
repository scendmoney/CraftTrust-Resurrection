import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701171990976 implements MigrationInterface {
    name = 'Migration1701171990976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "catalog_code" TO "verification_code"`);
        await queryRunner.query(`ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('New', 'Confirmed', 'WaitingForPickUp', 'WaitingForCarrier', 'Shipped', 'Completed', 'Cancel')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum_old" AS ENUM('Cancel', 'Completed', 'Confirmed', 'New', 'WaitingPickUp')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "verification_code" TO "catalog_code"`);
    }

}
