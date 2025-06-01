import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716897112982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE survey SET status='New'::public.survey_status_enum WHERE status='Activated'::public.survey_status_enum;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
