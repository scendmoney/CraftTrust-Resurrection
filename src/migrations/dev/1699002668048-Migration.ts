import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699002668048 implements MigrationInterface {
  name = 'Migration1699002668048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "FK_9f1749803f00eed29736dbc27c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0a7dd778eaeee9c6e7186a17e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f1749803f00eed29736dbc27c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "PK_261be7c54180a7e40cd7609f3bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "PK_21fcb793d095ca4b0d2dee68f91" PRIMARY KEY ("facility_id", "facility_rel_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "chat_sid" character varying(255)`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "facility_to_facility"."chat_sid" IS 'Chat sid (twilio)'`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "deleted_date" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "PK_21fcb793d095ca4b0d2dee68f91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "PK_ad71d53988c1f9577f9e8a7f20a" PRIMARY KEY ("facility_rel_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "PK_ad71d53988c1f9577f9e8a7f20a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "PK_6e8216944047fb135701dc63ab8" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_9f1749803f00eed29736dbc27c8" FOREIGN KEY ("facility_rel_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "FK_9f1749803f00eed29736dbc27c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "PK_6e8216944047fb135701dc63ab8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "PK_ad71d53988c1f9577f9e8a7f20a" PRIMARY KEY ("facility_rel_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "PK_ad71d53988c1f9577f9e8a7f20a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "PK_21fcb793d095ca4b0d2dee68f91" PRIMARY KEY ("facility_id", "facility_rel_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "deleted_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "updated_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "created_date"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "facility_to_facility"."chat_sid" IS 'Chat sid (twilio)'`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "chat_sid"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP CONSTRAINT "PK_21fcb793d095ca4b0d2dee68f91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "PK_261be7c54180a7e40cd7609f3bf" PRIMARY KEY ("facility_id", "facility_rel_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f1749803f00eed29736dbc27c" ON "facility_to_facility" ("facility_rel_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0a7dd778eaeee9c6e7186a17e" ON "facility_to_facility" ("facility_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_9f1749803f00eed29736dbc27c8" FOREIGN KEY ("facility_rel_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
