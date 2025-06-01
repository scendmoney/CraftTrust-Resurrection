import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706587857496 implements MigrationInterface {
    name = 'Migration1706587857496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_view"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "buyer_rejected_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TYPE "public"."survey_status_enum" RENAME TO "survey_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_status_enum" AS ENUM('New', 'Activated', 'Rejected', 'BuyerConfirmed', 'SurvaySent', 'Done')`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" TYPE "public"."survey_status_enum" USING "status"::"text"::"public"."survey_status_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" SET DEFAULT 'New'`);
        await queryRunner.query(`DROP TYPE "public"."survey_status_enum_old"`);
        await queryRunner.query(`CREATE VIEW "company_insight_view" AS 
    select 
    res.product_id as id,
    res.product_id,
    res.company_id,
    res.facility_buyer_id,
    res.facility_cultivator_id,
    res.surveys,
    (select ROUND(AVG(survey.age),2) AS age FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
    ) as age,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose_consumption FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose_consumption
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose_consumption,
    (select survey.appearance FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appearance
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appearance,
    (select survey.bud_hairs_color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.bud_hairs_color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as bud_hairs_color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.flavor_taste FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.flavor_taste
      ORDER BY COUNT(*) DESC
      limit 1
    ) as flavor_taste,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.stoney_is_it FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.stoney_is_it
      ORDER BY COUNT(*) DESC
      limit 1
    ) as stoney_is_it,
    (
    select survey.tell_friend FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id 
        and res.product_id = survey.product_id
      GROUP BY survey.tell_friend
      ORDER BY COUNT(*) DESC
      limit 1
    ) as tell_friend,
    (
      SELECT subquery.aroma_smells 
      FROM (
        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells 
        FROM public.survey survey
        left join public.subcompany s on s.id = survey.subcompany_id 
        where survey.deleted_date is null 
          and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
          and s.company_id = res.company_id 
          and res.product_id = survey.product_id
      ) AS subquery 
      GROUP BY subquery.product_id, subquery.aroma_smells  
      ORDER BY COUNT(*) 
      DESC LIMIT 1) AS aroma_smell
  from (
    select 
      survey.product_id,
      s.company_id,
      s.facility_buyer_id,
      c.facility_cultivator_id,
      COUNT(*) as surveys
    from public.survey survey
    left join public.subcompany s on s.id = survey.subcompany_id 
    left join public.company c on c.id = s.company_id
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurvaySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id
  ) as res
 `);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_buyer_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select ROUND(AVG(survey.age),2) AS age FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n    ) as age,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose_consumption FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose_consumption\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose_consumption,\n    (select survey.appearance FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appearance\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appearance,\n    (select survey.bud_hairs_color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.bud_hairs_color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as bud_hairs_color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.flavor_taste FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.flavor_taste\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as flavor_taste,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.stoney_is_it FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.stoney_is_it\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as stoney_is_it,\n    (\n    select survey.tell_friend FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id \n        and res.product_id = survey.product_id\n      GROUP BY survey.tell_friend\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as tell_friend,\n    (\n      SELECT subquery.aroma_smells \n      FROM (\n        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n        FROM public.survey survey\n        left join public.subcompany s on s.id = survey.subcompany_id \n        where survey.deleted_date is null \n          and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n          and s.company_id = res.company_id \n          and res.product_id = survey.product_id\n      ) AS subquery \n      GROUP BY subquery.product_id, subquery.aroma_smells  \n      ORDER BY COUNT(*) \n      DESC LIMIT 1) AS aroma_smell\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      s.facility_buyer_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurvaySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id\n  ) as res"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_view"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_status_enum_old" AS ENUM('New', 'Activated', 'BuyerConfirmed', 'SurvaySent', 'Done')`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" TYPE "public"."survey_status_enum_old" USING "status"::"text"::"public"."survey_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" SET DEFAULT 'New'`);
        await queryRunner.query(`DROP TYPE "public"."survey_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."survey_status_enum_old" RENAME TO "survey_status_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "buyer_rejected_date"`);
        await queryRunner.query(`CREATE VIEW "company_insight_view" AS select 
    res.product_id as id,
    res.product_id,
    res.company_id,
    res.facility_buyer_id,
    res.facility_cultivator_id,
    res.surveys,
    (select survey.age FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.age
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose_consumption FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose_consumption
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose_consumption,
    (select survey.appearance FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appearance
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appearance,
    (select survey.bud_hairs_color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.bud_hairs_color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as bud_hairs_color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.flavor_taste FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.flavor_taste
      ORDER BY COUNT(*) DESC
      limit 1
    ) as flavor_taste,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.stoney_is_it FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.stoney_is_it
      ORDER BY COUNT(*) DESC
      limit 1
    ) as stoney_is_it,
    (
    select survey.tell_friend FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id 
        and res.product_id = survey.product_id
      GROUP BY survey.tell_friend
      ORDER BY COUNT(*) DESC
      limit 1
    ) as tell_friend,
    (
      SELECT subquery.aroma_smells 
      FROM (
        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells 
        FROM public.survey survey
        left join public.subcompany s on s.id = survey.subcompany_id 
        where survey.deleted_date is null 
          and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
          and s.company_id = res.company_id 
          and res.product_id = survey.product_id
      ) AS subquery 
      GROUP BY subquery.product_id, subquery.aroma_smells  
      ORDER BY COUNT(*) 
      DESC LIMIT 1) AS aroma_smell
  from (
    select 
      survey.product_id,
      s.company_id,
      s.facility_buyer_id,
      c.facility_cultivator_id,
      COUNT(*) as surveys
    from public.survey survey
    left join public.subcompany s on s.id = survey.subcompany_id 
    left join public.company c on c.id = s.company_id
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurvaySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id
  ) as res`);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_buyer_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select survey.age FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.age\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as age,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose_consumption FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose_consumption\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose_consumption,\n    (select survey.appearance FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appearance\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appearance,\n    (select survey.bud_hairs_color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.bud_hairs_color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as bud_hairs_color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.flavor_taste FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.flavor_taste\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as flavor_taste,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.stoney_is_it FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.stoney_is_it\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as stoney_is_it,\n    (\n    select survey.tell_friend FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id \n        and res.product_id = survey.product_id\n      GROUP BY survey.tell_friend\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as tell_friend,\n    (\n      SELECT subquery.aroma_smells \n      FROM (\n        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n        FROM public.survey survey\n        left join public.subcompany s on s.id = survey.subcompany_id \n        where survey.deleted_date is null \n          and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n          and s.company_id = res.company_id \n          and res.product_id = survey.product_id\n      ) AS subquery \n      GROUP BY subquery.product_id, subquery.aroma_smells  \n      ORDER BY COUNT(*) \n      DESC LIMIT 1) AS aroma_smell\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      s.facility_buyer_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurvaySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id\n  ) as res"]);
    }

}
