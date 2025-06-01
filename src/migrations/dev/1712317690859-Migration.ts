import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1712317690859 implements MigrationInterface {
  //to prod
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public."configuration" (value, "type") VALUES('5', 'commissionOrderBuyer'::public.configuration_type_enum);
      INSERT INTO public."configuration" (value, "type") VALUES('5', 'commissionOrderCultivator'::public.configuration_type_enum);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
