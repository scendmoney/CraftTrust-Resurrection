import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706873696121 implements MigrationInterface {
    name = 'Migration1706873696121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_view"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "primary_purpose_consumption"`);
        await queryRunner.query(`DROP TYPE "public"."survey_primary_purpose_consumption_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "appearance"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "bud_hairs_color"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "flavor_taste"`);
        await queryRunner.query(`DROP TYPE "public"."survey_flavor_taste_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "stoney_is_it"`);
        await queryRunner.query(`DROP TYPE "public"."survey_stoney_is_it_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "tell_friend"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "flavor_taste_other"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_appealing_visually_enum" AS ENUM('Low', 'Midz', 'Fyre')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "appealing_visually" "public"."survey_appealing_visually_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_color_enum" AS ENUM('Green', 'Yellow', 'Purple')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "color" "public"."survey_color_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_smoked_enum" AS ENUM('Mild', 'Medium', 'Strong')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "smoked" "public"."survey_smoked_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_intoxication_enum" AS ENUM('Meh', 'Stoned', 'Wrecked')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "intoxication" "public"."survey_intoxication_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_primary_purpose_enum" AS ENUM('PainRelief', 'MentalHealth', 'Recreation')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "primary_purpose" "public"."survey_primary_purpose_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "age_range" smallint`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "nose"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_nose_enum" AS ENUM('Small', 'Medium', 'Large')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "nose" "public"."survey_nose_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."survey_experience_enum" RENAME TO "survey_experience_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_experience_enum" AS ENUM('EuphoricCreative', 'HeadyMental', 'RelaxingPainrelieving', 'FugginStupid')`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "experience" TYPE "public"."survey_experience_enum" USING "experience"::"text"::"public"."survey_experience_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_experience_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."survey_often_consume_cannabis_enum" RENAME TO "survey_often_consume_cannabis_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_often_consume_cannabis_enum" AS ENUM('Daily', 'Occassionally', 'Rarely')`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "often_consume_cannabis" TYPE "public"."survey_often_consume_cannabis_enum" USING "often_consume_cannabis"::"text"::"public"."survey_often_consume_cannabis_enum"`);
        await queryRunner.query(`DROP TYPE "public"."survey_often_consume_cannabis_enum_old"`);
        await queryRunner.query(`CREATE VIEW "company_insight_view" AS 
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
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.appealing_visually
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appealing_visually,
    (select survey.color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.smoked FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.smoked
      ORDER BY COUNT(*) DESC
      limit 1
    ) as smoked,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.intoxication FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.intoxication
      ORDER BY COUNT(*) DESC
      limit 1
    ) as intoxication,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.primary_purpose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose,
    (select survey.age_range FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id and res.product_id = survey.product_id
      GROUP BY survey.age_range
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age_range,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
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
	          and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
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
    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurvaySent'::survey_status_enum, 'Done'::survey_status_enum])
    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id
  ) as res
 `);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_buyer_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select survey.appealing_visually FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appealing_visually\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appealing_visually,\n    (select survey.color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.smoked FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.smoked\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as smoked,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.intoxication FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.intoxication\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as intoxication,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose,\n    (select survey.age_range FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.age_range\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as age_range,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (\n      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells\n\t  FROM (\n\t  SELECT aroma_smells\n\t      FROM (\n\t        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n\t        FROM public.survey survey\n\t        left join public.subcompany s on s.id = survey.subcompany_id \n\t        where survey.deleted_date is null \n\t          and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n\t          and s.company_id = res.company_id\n\t          and survey.product_id = res.product_id\n\t      ) AS subquery \n\t      GROUP BY subquery.product_id, subquery.aroma_smells  \n\t      ORDER BY COUNT(*) \n\t      DESC LIMIT 3\n\t      ) as resultAroma) AS aroma_smells\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      s.facility_buyer_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurvaySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id\n  ) as res"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","company_insight_view","public"]);
        await queryRunner.query(`DROP VIEW "company_insight_view"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_often_consume_cannabis_enum_old" AS ENUM('Daily', 'Occassionally', 'VeryRarely')`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "often_consume_cannabis" TYPE "public"."survey_often_consume_cannabis_enum_old" USING "often_consume_cannabis"::"text"::"public"."survey_often_consume_cannabis_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."survey_often_consume_cannabis_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."survey_often_consume_cannabis_enum_old" RENAME TO "survey_often_consume_cannabis_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_experience_enum_old" AS ENUM('HeadyCreative', 'RelaxingPainRelieving')`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "experience" TYPE "public"."survey_experience_enum_old" USING "experience"::"text"::"public"."survey_experience_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."survey_experience_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."survey_experience_enum_old" RENAME TO "survey_experience_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "nose"`);
        await queryRunner.query(`DROP TYPE "public"."survey_nose_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "nose" smallint`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "age_range"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "primary_purpose"`);
        await queryRunner.query(`DROP TYPE "public"."survey_primary_purpose_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "intoxication"`);
        await queryRunner.query(`DROP TYPE "public"."survey_intoxication_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "smoked"`);
        await queryRunner.query(`DROP TYPE "public"."survey_smoked_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "color"`);
        await queryRunner.query(`DROP TYPE "public"."survey_color_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "appealing_visually"`);
        await queryRunner.query(`DROP TYPE "public"."survey_appealing_visually_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "flavor_taste_other" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "tell_friend" smallint`);
        await queryRunner.query(`CREATE TYPE "public"."survey_stoney_is_it_enum" AS ENUM('Mild', 'VeryStoney')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "stoney_is_it" "public"."survey_stoney_is_it_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."survey_flavor_taste_enum" AS ENUM('Harsh', 'Mild', 'Robust', 'Smooth')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "flavor_taste" "public"."survey_flavor_taste_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "bud_hairs_color" smallint`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "appearance" smallint`);
        await queryRunner.query(`CREATE TYPE "public"."survey_primary_purpose_consumption_enum" AS ENUM('MentalHealth', 'PainRelief', 'Recreation')`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "primary_purpose_consumption" "public"."survey_primary_purpose_consumption_enum"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "age" smallint`);
        await queryRunner.query(`CREATE VIEW "company_insight_view" AS select 
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
  ) as res`);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","company_insight_view","select \n    res.product_id as id,\n    res.product_id,\n    res.company_id,\n    res.facility_buyer_id,\n    res.facility_cultivator_id,\n    res.surveys,\n    (select ROUND(AVG(survey.age),2) AS age FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n    ) as age,\n    (select survey.gender FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.gender\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as gender,\n    (select survey.often_consume_cannabis FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.often_consume_cannabis\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as often_consume_cannabis,\n    (select survey.primary_purpose_consumption FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.primary_purpose_consumption\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as primary_purpose_consumption,\n    (select survey.appearance FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.appearance\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as appearance,\n    (select survey.bud_hairs_color FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.bud_hairs_color\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as bud_hairs_color,\n    (select survey.nose FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.nose\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as nose,\n    (select survey.flavor_taste FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.flavor_taste\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as flavor_taste,\n    (select survey.experience FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.experience\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as experience,\n    (select survey.stoney_is_it FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id and res.product_id = survey.product_id\n      GROUP BY survey.stoney_is_it\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as stoney_is_it,\n    (\n    select survey.tell_friend FROM public.survey survey\n      left join public.subcompany s on s.id = survey.subcompany_id \n      where survey.deleted_date is null \n        and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n        and s.company_id = res.company_id \n        and res.product_id = survey.product_id\n      GROUP BY survey.tell_friend\n      ORDER BY COUNT(*) DESC\n      limit 1\n    ) as tell_friend,\n    (\n      SELECT subquery.aroma_smells \n      FROM (\n        SELECT survey.product_id, unnest(aroma_smells) AS aroma_smells \n        FROM public.survey survey\n        left join public.subcompany s on s.id = survey.subcompany_id \n        where survey.deleted_date is null \n          and survey.status in('SurvaySent'::public.survey_status_enum,'Done'::public.survey_status_enum) \n          and s.company_id = res.company_id \n          and res.product_id = survey.product_id\n      ) AS subquery \n      GROUP BY subquery.product_id, subquery.aroma_smells  \n      ORDER BY COUNT(*) \n      DESC LIMIT 1) AS aroma_smell\n  from (\n    select \n      survey.product_id,\n      s.company_id,\n      s.facility_buyer_id,\n      c.facility_cultivator_id,\n      COUNT(*) as surveys\n    from public.survey survey\n    left join public.subcompany s on s.id = survey.subcompany_id \n    left join public.company c on c.id = s.company_id\n    where survey.deleted_date is null and survey.status = ANY (ARRAY['SurvaySent'::survey_status_enum, 'Done'::survey_status_enum])\n    group by survey.product_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id\n  ) as res"]);
    }

}
