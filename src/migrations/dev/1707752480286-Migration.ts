import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707752480286 implements MigrationInterface {
    name = 'Migration1707752480286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_9011283056620f5eaa7ad74cef6"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_9011283056620f5eaa7ad74cef6" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_9011283056620f5eaa7ad74cef6"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_9011283056620f5eaa7ad74cef6" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
