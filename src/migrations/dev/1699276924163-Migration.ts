import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699276924163 implements MigrationInterface {
  name = 'Migration1699276924163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "context_id" character varying(48)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_55b4fcc847ce8295e83abd491f1" FOREIGN KEY ("context_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_55b4fcc847ce8295e83abd491f1"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "context_id"`);
  }
}
