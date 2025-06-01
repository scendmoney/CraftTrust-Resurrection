import { MigrationInterface, QueryRunner } from 'typeorm';
import crypto from 'crypto';
//move to prod

export class Migration1721291905365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.query(
      `select id FROM public.user where "issuer" is null`,
    );

    await Promise.all(
      users.map((user) =>
        queryRunner.query(`
           UPDATE "user" SET issuer='${crypto
             .randomBytes(64)
             .toString('hex')}' WHERE id='${user.id}';
        `),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
