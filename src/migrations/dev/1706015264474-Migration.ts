import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706015264474 implements MigrationInterface {
    name = 'Migration1706015264474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_d1efdbeb2c3b018427ed0b02b3d"`);
        await queryRunner.query(`CREATE TABLE "survey" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "survey_answer" ("id" SERIAL NOT NULL, "redeem_date" date, "survey_id" integer NOT NULL, "contact_id" integer NOT NULL, "product_id" integer, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_5a2a931b95ad2a866f8bc039db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "fullname" character varying(255) NOT NULL, "phone" character varying(24) NOT NULL, "is_activated" boolean NOT NULL DEFAULT false, "code" character varying(20), "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_f9f62556c7092913f2a06975052" UNIQUE ("phone"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcompany_to_contact" ("subcompany_id" integer NOT NULL, "contact_id" integer NOT NULL, CONSTRAINT "PK_9f46170264e58dbfebc0fb73248" PRIMARY KEY ("subcompany_id", "contact_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ec285d0fd402a15748a1eaaaf" ON "subcompany_to_contact" ("subcompany_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_90646ac5f7fa2b8b541c34c2b9" ON "subcompany_to_contact" ("contact_id") `);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "survey_answer" ADD CONSTRAINT "FK_ca5d0e0e096f8874883140eac9c" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey_answer" ADD CONSTRAINT "FK_3be32ac816ef61b1797a3f5b80d" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey_answer" ADD CONSTRAINT "FK_409985365c93bc717557ee6497c" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcompany_to_contact" ADD CONSTRAINT "FK_9ec285d0fd402a15748a1eaaaf4" FOREIGN KEY ("subcompany_id") REFERENCES "subcompany"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subcompany_to_contact" ADD CONSTRAINT "FK_90646ac5f7fa2b8b541c34c2b99" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcompany_to_contact" DROP CONSTRAINT "FK_90646ac5f7fa2b8b541c34c2b99"`);
        await queryRunner.query(`ALTER TABLE "subcompany_to_contact" DROP CONSTRAINT "FK_9ec285d0fd402a15748a1eaaaf4"`);
        await queryRunner.query(`ALTER TABLE "survey_answer" DROP CONSTRAINT "FK_409985365c93bc717557ee6497c"`);
        await queryRunner.query(`ALTER TABLE "survey_answer" DROP CONSTRAINT "FK_3be32ac816ef61b1797a3f5b80d"`);
        await queryRunner.query(`ALTER TABLE "survey_answer" DROP CONSTRAINT "FK_ca5d0e0e096f8874883140eac9c"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "product_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90646ac5f7fa2b8b541c34c2b9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ec285d0fd402a15748a1eaaaf"`);
        await queryRunner.query(`DROP TABLE "subcompany_to_contact"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "survey_answer"`);
        await queryRunner.query(`DROP TABLE "survey"`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_d1efdbeb2c3b018427ed0b02b3d" FOREIGN KEY ("product_id") REFERENCES "product_tree"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
