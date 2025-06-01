import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712317577410 implements MigrationInterface {
    name = 'Migration1712317577410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."configuration_type_enum" AS ENUM('commissionOrderBuyer', 'commissionOrderCultivator')`);
        await queryRunner.query(`CREATE TABLE "configuration" ("id" SERIAL NOT NULL, "value" character varying(100) NOT NULL DEFAULT '', "type" "public"."configuration_type_enum" NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_9a60597808bce764b9cd7969738" UNIQUE ("type"), CONSTRAINT "PK_03bad512915052d2342358f0d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`DROP TABLE "configuration"`);
        await queryRunner.query(`DROP TYPE "public"."configuration_type_enum"`);
    }

}
