import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707906768896 implements MigrationInterface {
    name = 'Migration1707906768896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941"`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941"`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
