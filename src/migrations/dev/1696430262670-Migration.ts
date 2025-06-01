import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696430262670 implements MigrationInterface {
  name = 'Migration1696430262670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_64785df36f923563795d325d68e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_2f46d93cec492d987e88e066f96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP CONSTRAINT "PK_07c6c82781d105a680b5c265be6"`,
    );
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "id" character varying(48) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ALTER COLUMN "alias" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "license_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "license_number" character varying(48) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ALTER COLUMN "license_start_date" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ALTER COLUMN "license_end_date" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" character varying(48) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "license_number"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "license_number" character varying(48) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "license_start_date" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "license_end_date" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "facility_id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "facility_id" character varying(48)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_d18a6c052c34da34c81612e6f72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_2f46d93cec492d987e88e066f96" PRIMARY KEY ("facility_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe3e233a3057f433fa0eff473c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD "user_id" character varying(48) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_2f46d93cec492d987e88e066f96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_d18a6c052c34da34c81612e6f72" PRIMARY KEY ("facility_id", "user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_d18a6c052c34da34c81612e6f72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_fe3e233a3057f433fa0eff473cb" PRIMARY KEY ("user_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2f46d93cec492d987e88e066f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP COLUMN "facility_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD "facility_id" character varying(48) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_fe3e233a3057f433fa0eff473cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_d18a6c052c34da34c81612e6f72" PRIMARY KEY ("user_id", "facility_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe3e233a3057f433fa0eff473c" ON "user_to_facilities" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2f46d93cec492d987e88e066f9" ON "user_to_facilities" ("facility_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_64785df36f923563795d325d68e" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_2f46d93cec492d987e88e066f96" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_2f46d93cec492d987e88e066f96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_64785df36f923563795d325d68e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2f46d93cec492d987e88e066f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe3e233a3057f433fa0eff473c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_d18a6c052c34da34c81612e6f72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_fe3e233a3057f433fa0eff473cb" PRIMARY KEY ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP COLUMN "facility_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD "facility_id" character varying(24) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2f46d93cec492d987e88e066f9" ON "user_to_facilities" ("facility_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_fe3e233a3057f433fa0eff473cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_d18a6c052c34da34c81612e6f72" PRIMARY KEY ("facility_id", "user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_d18a6c052c34da34c81612e6f72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_2f46d93cec492d987e88e066f96" PRIMARY KEY ("facility_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD "user_id" character varying(24) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe3e233a3057f433fa0eff473c" ON "user_to_facilities" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" DROP CONSTRAINT "PK_2f46d93cec492d987e88e066f96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "PK_d18a6c052c34da34c81612e6f72" PRIMARY KEY ("user_id", "facility_id")`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "facility_id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "facility_id" character varying(24)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "license_end_date" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "license_start_date" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "license_number"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "license_number" character varying(32) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" character varying(24) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_fe3e233a3057f433fa0eff473cb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ALTER COLUMN "license_end_date" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ALTER COLUMN "license_start_date" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "license_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "license_number" character varying(32) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ALTER COLUMN "alias" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP CONSTRAINT "PK_07c6c82781d105a680b5c265be6"`,
    );
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "id" character varying(24) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_facilities" ADD CONSTRAINT "FK_2f46d93cec492d987e88e066f96" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_64785df36f923563795d325d68e" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
