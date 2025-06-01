import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716897317600 implements MigrationInterface {
    name = 'Migration1716897317600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_buyer_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_buyer_view"`);
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_view"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "code_date"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "activated_date"`);
        await queryRunner.query(`ALTER TYPE "public"."nft_status_enum" RENAME TO "nft_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."nft_status_enum" AS ENUM('blocked', 'processing', 'done', 'error')`);
        await queryRunner.query(`ALTER TABLE "nft" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "nft" ALTER COLUMN "status" TYPE "public"."nft_status_enum" USING "status"::"text"::"public"."nft_status_enum"`);
        await queryRunner.query(`ALTER TABLE "nft" ALTER COLUMN "status" SET DEFAULT 'processing'`);
        await queryRunner.query(`DROP TYPE "public"."nft_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."survey_status_enum" RENAME TO "survey_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_status_enum" AS ENUM('New', 'Rejected', 'BuyerConfirmed', 'SurveySent', 'Done')`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" TYPE "public"."survey_status_enum" USING "status"::"text"::"public"."survey_status_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" SET DEFAULT 'New'`);
        await queryRunner.query(`DROP TYPE "public"."survey_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "uuid" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT '0.25'`);
        await queryRunner.query(`CREATE VIEW "company_insight_view" AS 
  select 
    res.product_id as id,
    res.product_id,
    res.company_id,
    res.facility_cultivator_id,
    res.surveys,
    (select survey.appealing_visually FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appealing_visually
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appealing_visually,
    (select survey.color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.smoked FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.smoked
      ORDER BY COUNT(*) DESC
      limit 1
    ) as smoked,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.intoxication FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.intoxication
      ORDER BY COUNT(*) DESC
      limit 1
    ) as intoxication,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose,
    (select survey.age_range FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.age_range
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age_range,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (
      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells
	  FROM (
	  SELECT aroma_smells
	      FROM (
	        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells 
	        FROM public.survey survey
	        left join public.subcompany s on s.id = survey.subcompany_id 
	        where survey.deleted_date is null 
	          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
	          and s.company_id = res.company_id
	          and survey.product_id = res.product_id
	      ) AS subquery 
	      GROUP BY subquery.product_id, subquery.aroma_smells  
	      ORDER BY COUNT(*) 
	      DESC LIMIT 3
	      ) as resultAroma) AS aroma_smells
  from (
    select 
      survey.product_id,
      s.company_id,
      c.facility_cultivator_id,
      COUNT(*) as surveys
    from public.survey survey
    left join public.subcompany s on s.id = survey.subcompany_id 
    left join public.company c on c.id = s.company_id
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, c.facility_cultivator_id
  ) as res;
 `);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select survey.appealing_visually FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appealing_visually\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appealing_visually,\n    (select survey.color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.smoked FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.smoked\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as smoked,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.intoxication FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.intoxication\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as intoxication,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose,\n    (select survey.age_range FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.age_range\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as age_range,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (\n      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells\n\t  FROM (\n\t  SELECT aroma_smells\n\t      FROM (\n\t        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n\t        FROM public.survey survey\n\t        left join public.subcompany s on s.id = survey.subcompany_id \n\t        where survey.deleted_date is null \n\t          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n\t          and s.company_id = res.company_id\n\t          and survey.product_id = res.product_id\n\t      ) AS subquery \n\t      GROUP BY subquery.product_id, subquery.aroma_smells  \n\t      ORDER BY COUNT(*) \n\t      DESC LIMIT 3\n\t      ) as resultAroma) AS aroma_smells\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, c.facility_cultivator_id\n  ) as res;"]);
        await queryRunner.query(`CREATE VIEW "company_insight_buyer_view" AS 
  select 
    res.product_id as id,
    res.product_id,
    res.company_id,
    res.facility_buyer_id,
    res.facility_cultivator_id,
    res.surveys,
    (select survey.appealing_visually FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appealing_visually
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appealing_visually,
    (select survey.color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.smoked FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.smoked
      ORDER BY COUNT(*) DESC
      limit 1
    ) as smoked,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.intoxication FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.intoxication
      ORDER BY COUNT(*) DESC
      limit 1
    ) as intoxication,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose,
    (select survey.age_range FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.age_range
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age_range,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (
      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells
	  FROM (
	  SELECT aroma_smells
	      FROM (
	        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells 
	        FROM public.survey survey
	        left join public.subcompany s on s.id = survey.subcompany_id 
	        where survey.deleted_date is null 
	          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
	          and s.company_id = res.company_id
	          and survey.product_id = res.product_id
	      ) AS subquery 
	      GROUP BY subquery.product_id, subquery.aroma_smells  
	      ORDER BY COUNT(*) 
	      DESC LIMIT 3
	      ) as resultAroma) AS aroma_smells
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
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id
  ) as res;
 `);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_buyer_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_buyer_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select survey.appealing_visually FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appealing_visually\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appealing_visually,\n    (select survey.color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.smoked FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.smoked\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as smoked,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.intoxication FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.intoxication\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as intoxication,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose,\n    (select survey.age_range FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.age_range\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as age_range,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (\n      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells\n\t  FROM (\n\t  SELECT aroma_smells\n\t      FROM (\n\t        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n\t        FROM public.survey survey\n\t        left join public.subcompany s on s.id = survey.subcompany_id \n\t        where survey.deleted_date is null \n\t          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n\t          and s.company_id = res.company_id\n\t          and survey.product_id = res.product_id\n\t      ) AS subquery \n\t      GROUP BY subquery.product_id, subquery.aroma_smells  \n\t      ORDER BY COUNT(*) \n\t      DESC LIMIT 3\n\t      ) as resultAroma) AS aroma_smells\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      s.facility_buyer_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id\n  ) as res;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_buyer_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_buyer_view"`);
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_view"`);
        await queryRunner.query(`ALTER TABLE "product_tree" ALTER COLUMN "quantity_stock_min" SET DEFAULT 0.25`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`CREATE TYPE "public"."survey_status_enum_old" AS ENUM('New', 'Activated', 'Rejected', 'BuyerConfirmed', 'SurveySent', 'Done')`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" TYPE "public"."survey_status_enum_old" USING "status"::"text"::"public"."survey_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "status" SET DEFAULT 'New'`);
        await queryRunner.query(`DROP TYPE "public"."survey_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."survey_status_enum_old" RENAME TO "survey_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."nft_status_enum_old" AS ENUM('processing', 'done', 'error')`);
        await queryRunner.query(`ALTER TABLE "nft" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "nft" ALTER COLUMN "status" TYPE "public"."nft_status_enum_old" USING "status"::"text"::"public"."nft_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "nft" ALTER COLUMN "status" SET DEFAULT 'processing'`);
        await queryRunner.query(`DROP TYPE "public"."nft_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."nft_status_enum_old" RENAME TO "nft_status_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "activated_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "code_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "code" integer NOT NULL`);
        await queryRunner.query(`CREATE VIEW "company_insight_view" AS select 
    res.product_id as id,
    res.product_id,
    res.company_id,
    res.facility_cultivator_id,
    res.surveys,
    (select survey.appealing_visually FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appealing_visually
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appealing_visually,
    (select survey.color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.smoked FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.smoked
      ORDER BY COUNT(*) DESC
      limit 1
    ) as smoked,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.intoxication FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.intoxication
      ORDER BY COUNT(*) DESC
      limit 1
    ) as intoxication,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose,
    (select survey.age_range FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.age_range
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age_range,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (
      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells
	  FROM (
	  SELECT aroma_smells
	      FROM (
	        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells 
	        FROM public.survey survey
	        left join public.subcompany s on s.id = survey.subcompany_id 
	        where survey.deleted_date is null 
	          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
	          and s.company_id = res.company_id
	          and survey.product_id = res.product_id
	      ) AS subquery 
	      GROUP BY subquery.product_id, subquery.aroma_smells  
	      ORDER BY COUNT(*) 
	      DESC LIMIT 3
	      ) as resultAroma) AS aroma_smells
  from (
    select 
      survey.product_id,
      s.company_id,
      c.facility_cultivator_id,
      COUNT(*) as surveys
    from public.survey survey
    left join public.subcompany s on s.id = survey.subcompany_id 
    left join public.company c on c.id = s.company_id
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, c.facility_cultivator_id
  ) as res`);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select survey.appealing_visually FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appealing_visually\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appealing_visually,\n    (select survey.color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.smoked FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.smoked\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as smoked,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.intoxication FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.intoxication\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as intoxication,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose,\n    (select survey.age_range FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.age_range\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as age_range,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (\n      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells\n\t  FROM (\n\t  SELECT aroma_smells\n\t      FROM (\n\t        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n\t        FROM public.survey survey\n\t        left join public.subcompany s on s.id = survey.subcompany_id \n\t        where survey.deleted_date is null \n\t          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n\t          and s.company_id = res.company_id\n\t          and survey.product_id = res.product_id\n\t      ) AS subquery \n\t      GROUP BY subquery.product_id, subquery.aroma_smells  \n\t      ORDER BY COUNT(*) \n\t      DESC LIMIT 3\n\t      ) as resultAroma) AS aroma_smells\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, c.facility_cultivator_id\n  ) as res"]);
        await queryRunner.query(`CREATE VIEW "company_insight_buyer_view" AS select 
    res.product_id as id,
    res.product_id,
    res.company_id,
    res.facility_buyer_id,
    res.facility_cultivator_id,
    res.surveys,
    (select survey.appealing_visually FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appealing_visually
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appealing_visually,
    (select survey.color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.smoked FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.smoked
      ORDER BY COUNT(*) DESC
      limit 1
    ) as smoked,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.intoxication FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.intoxication
      ORDER BY COUNT(*) DESC
      limit 1
    ) as intoxication,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose,
    (select survey.age_range FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.age_range
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age_range,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (
      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells
	  FROM (
	  SELECT aroma_smells
	      FROM (
	        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells 
	        FROM public.survey survey
	        left join public.subcompany s on s.id = survey.subcompany_id 
	        where survey.deleted_date is null 
	          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
	          and s.company_id = res.company_id
	          and survey.product_id = res.product_id
	      ) AS subquery 
	      GROUP BY subquery.product_id, subquery.aroma_smells  
	      ORDER BY COUNT(*) 
	      DESC LIMIT 3
	      ) as resultAroma) AS aroma_smells
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
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id
  ) as res`);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_buyer_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_buyer_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select survey.appealing_visually FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appealing_visually\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appealing_visually,\n    (select survey.color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.smoked FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.smoked\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as smoked,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.intoxication FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.intoxication\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as intoxication,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose,\n    (select survey.age_range FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.age_range\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as age_range,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (\n      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells\n\t  FROM (\n\t  SELECT aroma_smells\n\t      FROM (\n\t        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n\t        FROM public.survey survey\n\t        left join public.subcompany s on s.id = survey.subcompany_id \n\t        where survey.deleted_date is null \n\t          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n\t          and s.company_id = res.company_id\n\t          and survey.product_id = res.product_id\n\t      ) AS subquery \n\t      GROUP BY subquery.product_id, subquery.aroma_smells  \n\t      ORDER BY COUNT(*) \n\t      DESC LIMIT 3\n\t      ) as resultAroma) AS aroma_smells\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      s.facility_buyer_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurveySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id\n  ) as res"]);
    }

}
