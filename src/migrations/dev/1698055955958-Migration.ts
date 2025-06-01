import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1698055955958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE public.product SET status='new'::public.product_status_enum;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('');
  }
}
