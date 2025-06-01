import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721111445423 implements MigrationInterface {
    name = 'Migration1721111445423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "code" ("id" SERIAL NOT NULL, "generate_code_count" integer NOT NULL DEFAULT '0', "attempt_date" TIMESTAMP WITH TIME ZONE, "phone" character varying(24), "code" integer, "ip_address" character varying(15) NOT NULL, "user_id" character varying(48), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_2c4a681bc6a5fa9f5d4149f86b" UNIQUE ("user_id"), CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_recovery_password" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "code_recovery_password" character varying(256)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "date_recovery_password" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "date_recovery_done" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying(255) NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`ALTER TABLE "code" ADD CONSTRAINT "FK_2c4a681bc6a5fa9f5d4149f86bf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code" DROP CONSTRAINT "FK_2c4a681bc6a5fa9f5d4149f86bf"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date_recovery_done"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date_recovery_password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "code_recovery_password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_recovery_password"`);
        await queryRunner.query(`DROP TABLE "code"`);
    }

}
