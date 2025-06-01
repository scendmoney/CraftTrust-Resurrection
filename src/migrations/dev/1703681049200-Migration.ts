import { MigrationInterface, QueryRunner } from 'typeorm';

// custom
export class Migration1703681049200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE public."user" SET public_address=null`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
