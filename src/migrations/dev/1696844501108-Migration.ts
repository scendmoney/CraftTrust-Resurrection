import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696844501108 implements MigrationInterface {
  name = 'Migration1696844501108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "asset_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e21f8c1180fa83c07e5399ecb04" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e21f8c1180fa83c07e5399ecb04"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "asset_id"`);
  }
}
