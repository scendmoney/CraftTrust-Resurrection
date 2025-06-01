import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699021894264 implements MigrationInterface {
  name = 'Migration1699021894264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" SERIAL NOT NULL, "total" numeric(10,2) NOT NULL DEFAULT '0', "facility_buyer_id" character varying(48) NOT NULL, "facility_cultivator_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_item" ("id" SERIAL NOT NULL, "quantity" numeric(5,2) NOT NULL DEFAULT '0', "price" numeric(10,2) NOT NULL DEFAULT '0', "product_id" integer NOT NULL, "cart_id" integer NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_fc7005ba4cf7cbd5b9c302954e7" FOREIGN KEY ("facility_buyer_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_bd4072609f73da2bcfd53b0487c" FOREIGN KEY ("facility_cultivator_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_67a2e8406e01ffa24ff9026944e" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_67a2e8406e01ffa24ff9026944e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_bd4072609f73da2bcfd53b0487c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_fc7005ba4cf7cbd5b9c302954e7"`,
    );
    await queryRunner.query(`DROP TABLE "cart_item"`);
    await queryRunner.query(`DROP TABLE "cart"`);
  }
}
