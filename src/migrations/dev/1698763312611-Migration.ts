import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1698763312611 implements MigrationInterface {
  name = 'Migration1698763312611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_tree" ADD "quantity_metrc" numeric(5,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_tree" DROP COLUMN "quantity_metrc"`,
    );
  }
}
