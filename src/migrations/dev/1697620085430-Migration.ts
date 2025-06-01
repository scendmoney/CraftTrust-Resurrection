import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697620085430 implements MigrationInterface {
  name = 'Migration1697620085430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."invite_type_enum" AS ENUM('buyer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "invite" ("id" SERIAL NOT NULL, "type" "public"."invite_type_enum" NOT NULL, "is_activated" boolean NOT NULL DEFAULT false, "code" character varying(20), "phone" character varying(24) NOT NULL, "facility_id" character varying(48), "relation_facility_id" character varying(48), "owner_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_0d1c8d3a6602c6afdd9c016b04d" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_8a2aee0306b23d1a037fe20f749" FOREIGN KEY ("relation_facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_267ec7b773607be6949152c583b" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_267ec7b773607be6949152c583b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_8a2aee0306b23d1a037fe20f749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_0d1c8d3a6602c6afdd9c016b04d"`,
    );
    await queryRunner.query(`DROP TABLE "invite"`);
    await queryRunner.query(`DROP TYPE "public"."invite_type_enum"`);
  }
}
