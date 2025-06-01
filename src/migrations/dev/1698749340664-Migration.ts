import { MigrationInterface, QueryRunner } from 'typeorm';

//move to prod
export class Migration1698749340664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE product RENAME TO product_tree;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('');
  }
}
