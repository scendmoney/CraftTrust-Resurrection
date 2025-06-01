import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1698055874261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE public.product SET status='archived'::public.product_status_enum;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('');
  }
}
