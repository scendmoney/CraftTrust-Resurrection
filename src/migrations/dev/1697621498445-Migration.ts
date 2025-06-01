import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697621498445 implements MigrationInterface {
  name = 'Migration1697621498445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "quantity_stock" numeric(5,2) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "quantity" numeric(5,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "quantity" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "quantity_stock"`,
    );
  }
}
