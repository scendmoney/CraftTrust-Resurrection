import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697622675271 implements MigrationInterface {
  name = 'Migration1697622675271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "quantity_stock_min" numeric(5,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "quantity_stock_min"`,
    );
  }
}
