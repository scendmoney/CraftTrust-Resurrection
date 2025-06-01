import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700645552548 implements MigrationInterface {
    name = 'Migration1700645552548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification_status_enum" AS ENUM('read', 'new')`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('message')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, "theme" character varying NOT NULL, "description" character varying(3000) NOT NULL DEFAULT '', "status" "public"."notification_status_enum" NOT NULL DEFAULT 'new', "type" "public"."notification_type_enum" NOT NULL, "owner_id" character varying(48) NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id")); COMMENT ON COLUMN "notification"."theme" IS 'Theme'; COMMENT ON COLUMN "notification"."description" IS 'Description'`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_3fd4edd1f8ca57ed9c674346fee" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_3fd4edd1f8ca57ed9c674346fee"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notification_status_enum"`);
    }

}
