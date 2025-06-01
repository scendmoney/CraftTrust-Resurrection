import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699622979485 implements MigrationInterface {
  name = 'Migration1699622979485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "is_message_buyer" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "is_message_cultivator" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "date_message_buyer" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" ADD "date_message_cultivator" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD "is_chat_message" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facility" DROP COLUMN "is_chat_message"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "date_message_cultivator"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "date_message_buyer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "is_message_cultivator"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_to_facility" DROP COLUMN "is_message_buyer"`,
    );
  }
}
