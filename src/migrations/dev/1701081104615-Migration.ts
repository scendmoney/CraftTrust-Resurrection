import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701081104615 implements MigrationInterface {
    name = 'Migration1701081104615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_product" ("id" SERIAL NOT NULL, "quantity" numeric(5,2) NOT NULL DEFAULT '0', "price" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(15,2) NOT NULL, "order_id" integer NOT NULL, "product_id" integer, "parent_product_id" integer NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id")); COMMENT ON COLUMN "order_product"."total" IS 'total'`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('New', 'Confirmed', 'WaitingPickUp', 'Completed', 'Cancel')`);
        await queryRunner.query(`CREATE TYPE "public"."order_shipping_type_enum" AS ENUM('PickUp', 'Delivery')`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_type_enum" AS ENUM('PayNow', 'PayOnDelivery', 'Net')`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_status_enum" AS ENUM('NotPaid', 'Paid', 'Due', 'Overdue')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "total" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."order_status_enum" NOT NULL, "shipping_type" "public"."order_shipping_type_enum" NOT NULL, "payment_type" "public"."order_payment_type_enum" NOT NULL, "payment_status" "public"."order_payment_status_enum" NOT NULL DEFAULT 'NotPaid', "payment_date" TIMESTAMP WITH TIME ZONE, "phone" character varying(20), "zip" integer, "address" character varying, "city" character varying, "car" character varying, "catalog_code" integer NOT NULL, "contact_person_id" character varying(48), "pickup_person_id" character varying(48), "facility_buyer_id" character varying(48) NOT NULL, "facility_cultivator_id" character varying(48) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")); COMMENT ON COLUMN "order"."address" IS 'address'`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "CHK_00692cf20a56bb7d5bc9934912" CHECK ("quantity_metrc" >= 0)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "CHK_19df7ab5b3dbdae22292347b8c" CHECK ("quantity" >= 0)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "CHK_8d1933d21fabced7cf710d0015" CHECK ("quantity_stock_min" >= 0)`);
        await queryRunner.query(`ALTER TABLE "product_tree" ADD CONSTRAINT "CHK_50fc53ff3da29c7c79ed2fedf4" CHECK ("quantity_stock" >= 0)`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_2ae75e3ae7b509aa6dd84f8bd3e" FOREIGN KEY ("parent_product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_224f346de37acb5fac82a0c3303" FOREIGN KEY ("contact_person_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_c4654d623901ec71fbd988f31fa" FOREIGN KEY ("pickup_person_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_bc635c4c3e886187fad43e328d5" FOREIGN KEY ("facility_buyer_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_5ce0ee80ac95c2bf7c4f23f98ce" FOREIGN KEY ("facility_cultivator_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_5ce0ee80ac95c2bf7c4f23f98ce"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_bc635c4c3e886187fad43e328d5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_c4654d623901ec71fbd988f31fa"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_224f346de37acb5fac82a0c3303"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_2ae75e3ae7b509aa6dd84f8bd3e"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "CHK_50fc53ff3da29c7c79ed2fedf4"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "CHK_8d1933d21fabced7cf710d0015"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "CHK_19df7ab5b3dbdae22292347b8c"`);
        await queryRunner.query(`ALTER TABLE "product_tree" DROP CONSTRAINT "CHK_00692cf20a56bb7d5bc9934912"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_shipping_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_product"`);
    }

}
