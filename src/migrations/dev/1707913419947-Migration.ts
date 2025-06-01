import { MigrationInterface, QueryRunner } from 'typeorm';
// move to prod
export class Migration1707913419947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE public."user" SET join_date=created_date where email is not null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
