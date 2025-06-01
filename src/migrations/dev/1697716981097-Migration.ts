import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697716981097 implements MigrationInterface {
  name = 'Migration1697716981097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "facility_to_facility" ("facility_id" character varying(48) NOT NULL, "facility_rel_id" character varying(48) NOT NULL, CONSTRAINT "PK_261be7c54180a7e40cd7609f3bf" PRIMARY KEY ("facility_id", "facility_rel_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0a7dd778eaeee9c6e7186a17e" ON "facility_to_facility" ("facility_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f1749803f00eed29736dbc27c" ON "facility_to_facility" ("facility_rel_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_d0a7dd778eaeee9c6e7186a17e7" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD CONSTRAINT "FK_9f1749803f00eed29736dbc27c8" FOREIGN KEY ("facility_rel_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `DROP INDEX "public"."IDX_9f1749803f00eed29736dbc27c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0a7dd778eaeee9c6e7186a17e"`,
    );
    await queryRunner.query(`DROP TABLE "facility_to_facility"`);
  }
}
