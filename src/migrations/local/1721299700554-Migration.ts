import { IsMobilePhone } from 'class-validator';
import { MigrationInterface, QueryRunner } from 'typeorm';
//move to only dev/stage

export class Migration1721299700554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.query(
      `select id, phone_number FROM public.user where "phone_number" is not null`,
    );

    await Promise.all(
      users.map((user) => {
        const phone =
          '+' +
          user.phone_number
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll(' ', '')
            .replaceAll('-', '')
            .replaceAll('+', '');

        const valid = IsMobilePhone(phone, 'en-US');

        return queryRunner.query(`
                 UPDATE "user" SET phone_number=${
                   valid ? `'${phone}'` : null
                 } WHERE id='${user.id}';
              `);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
