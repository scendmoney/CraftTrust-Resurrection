import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708416440262 implements MigrationInterface {
    name = 'Migration1708416440262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_9fed65f0d0be12791939428602" ON "facility" ("user_contact_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1da8b970b48ac510a14be5d9fc" ON "facility" ("owner_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce1ffdd0323d5d99131c5bdbef" ON "transaction" ("facility_to") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc71e3fd3c0549a25625bc03b4" ON "transaction" ("facility_from") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ce0ee80ac95c2bf7c4f23f98c" ON "order" ("facility_cultivator_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc635c4c3e886187fad43e328d" ON "order" ("facility_buyer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_40ba13327d1e116a1f6bb19b51" ON "company" ("facility_cultivator_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_55b4fcc847ce8295e83abd491f" ON "user" ("context_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd4072609f73da2bcfd53b0487" ON "cart" ("facility_cultivator_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc7005ba4cf7cbd5b9c302954e" ON "cart" ("facility_buyer_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_fc7005ba4cf7cbd5b9c302954e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd4072609f73da2bcfd53b0487"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55b4fcc847ce8295e83abd491f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40ba13327d1e116a1f6bb19b51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc635c4c3e886187fad43e328d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ce0ee80ac95c2bf7c4f23f98c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc71e3fd3c0549a25625bc03b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce1ffdd0323d5d99131c5bdbef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1da8b970b48ac510a14be5d9fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9fed65f0d0be12791939428602"`);
    }

}
