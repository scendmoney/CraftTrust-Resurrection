import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701431690811 implements MigrationInterface {
    name = 'Migration1701431690811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."request_type_enum" AS ENUM('contactUs', 'request')`);
        await queryRunner.query(`CREATE TYPE "public"."request_facility_role_enum" AS ENUM('buyer', 'cultivator')`);
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum" AS ENUM('new', 'closed')`);
        await queryRunner.query(`CREATE TABLE "request" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL DEFAULT '', "message" character varying DEFAULT '', "phone" character varying(24), "email" character varying(255), "license_number" character varying(48), "type" "public"."request_type_enum" NOT NULL, "facility_role" "public"."request_facility_role_enum", "status" "public"."request_status_enum" NOT NULL DEFAULT 'new', "admin_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_0ddcbcfa15fa2bd08c66669c445" FOREIGN KEY ("admin_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_0ddcbcfa15fa2bd08c66669c445"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."request_facility_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."request_type_enum"`);
    }

}
