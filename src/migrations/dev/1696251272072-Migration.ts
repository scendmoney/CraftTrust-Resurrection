import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696251272072 implements MigrationInterface {
  name = 'Migration1696251272072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "facility" ADD "asset_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "facility" ADD CONSTRAINT "FK_c366539aa87e3409918f09bedb7" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility" DROP CONSTRAINT "FK_c366539aa87e3409918f09bedb7"`,
    );
    await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "asset_id"`);
  }
}
