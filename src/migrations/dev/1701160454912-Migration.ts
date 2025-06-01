import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1701160454912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER SEQUENCE "public".order_id_seq RESTART WITH 100000;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
