import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701944618156 implements MigrationInterface {
    name = 'Migration1701944618156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_c4654d623901ec71fbd988f31fa"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "pickup_person_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "pickup_person_id" character varying(48)`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_c4654d623901ec71fbd988f31fa" FOREIGN KEY ("pickup_person_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
