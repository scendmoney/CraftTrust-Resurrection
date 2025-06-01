import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696345187537 implements MigrationInterface {
  name = 'Migration1696345187537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_to_assets" ("product_id" integer NOT NULL, "asset_id" integer NOT NULL, CONSTRAINT "PK_8910bd9d829e12c5b882fa706c5" PRIMARY KEY ("product_id", "asset_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b4d1de47192a02c4ac97bb74f3" ON "product_to_assets" ("product_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69bf73c87a8378cb9ab661818c" ON "product_to_assets" ("asset_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product_to_assets" ADD CONSTRAINT "FK_b4d1de47192a02c4ac97bb74f39" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_to_assets" ADD CONSTRAINT "FK_69bf73c87a8378cb9ab661818cb" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_to_assets" DROP CONSTRAINT "FK_69bf73c87a8378cb9ab661818cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_to_assets" DROP CONSTRAINT "FK_b4d1de47192a02c4ac97bb74f39"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69bf73c87a8378cb9ab661818c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b4d1de47192a02c4ac97bb74f3"`,
    );
    await queryRunner.query(`DROP TABLE "product_to_assets"`);
  }
}
