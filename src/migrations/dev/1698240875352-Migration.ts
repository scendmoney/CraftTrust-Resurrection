import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1698240875352 implements MigrationInterface {
  name = 'Migration1698240875352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "thumbnail_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_5cd3c8b06d45e575517e8358033" FOREIGN KEY ("thumbnail_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_5cd3c8b06d45e575517e8358033"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "thumbnail_id"`);
  }
}
