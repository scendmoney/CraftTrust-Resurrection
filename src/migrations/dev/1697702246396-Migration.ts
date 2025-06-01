import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697702246396 implements MigrationInterface {
  name = 'Migration1697702246396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite" ADD "name" character varying(255) NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "name"`);
  }
}
