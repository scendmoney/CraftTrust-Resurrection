import { ProductModel } from '@entities/product/product.model';
import {
  AppealingVisuallyEnum,
  ColorEnum,
  ExperienceEnum,
  IntoxicationEnum,
  NoseEnum,
  PrimaryPurposeEnum,
  SmokedEnum,
  SurveyGenderEnum,
  SurveyOftenConsumeCannabisEnum,
} from '@entities/survey/survey.enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ViewEntity, ViewColumn } from 'typeorm';
import { CompanyModel } from './company.model';

@ObjectType({ isAbstract: true })
@ViewEntity('company_insight_buyer_view', {
  expression: `
   select 
    res.product_id as id,
    res.company_id,
    res.facility_buyer_id,
    res.facility_cultivator_id,
    res.surveys,
    (select survey.appealing_visually FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.appealing_visually
      ORDER BY COUNT(*) DESC
      limit 1
    ) as appealing_visually,
    (select survey.color FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.color
      ORDER BY COUNT(*) DESC
      limit 1
    ) as color,
    (select survey.nose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.nose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as nose,
    (select survey.smoked FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.smoked
      ORDER BY COUNT(*) DESC
      limit 1
    ) as smoked,
    (select survey.experience FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.experience
      ORDER BY COUNT(*) DESC
      limit 1
    ) as experience,
    (select survey.intoxication FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.intoxication
      ORDER BY COUNT(*) DESC
      limit 1
    ) as intoxication,
    (select survey.often_consume_cannabis FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.often_consume_cannabis
      ORDER BY COUNT(*) DESC
      limit 1
    ) as often_consume_cannabis,
    (select survey.primary_purpose FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.primary_purpose
      ORDER BY COUNT(*) DESC
      limit 1
    ) as primary_purpose,
    (select survey.age_range FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.age_range
      ORDER BY COUNT(*) DESC
      limit 1
    ) as age_range,
    (select survey.gender FROM public.survey survey
      left join public.subcompany s on s.id = survey.subcompany_id 
      where survey.deleted_date is null 
        and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
        and s.company_id = res.company_id
      GROUP BY survey.gender
      ORDER BY COUNT(*) DESC
      limit 1
    ) as gender,
    (
      SELECT json_agg(resultAroma.aroma_smells) AS aroma_smells
	  FROM (
	  SELECT aroma_smells
	      FROM (
	        SELECT  unnest(aroma_smells) AS aroma_smells 
	        FROM public.survey survey
	        left join public.subcompany s on s.id = survey.subcompany_id 
	        where survey.deleted_date is null 
	          and survey.status in('SurveySent'::public.survey_status_enum,'Done'::public.survey_status_enum) 
	          and s.company_id = res.company_id
	      ) AS subquery 
	      GROUP BY subquery.aroma_smells  
	      ORDER BY COUNT(*) 
	      DESC LIMIT 3
	      ) as resultAroma) AS aroma_smells
  from (
    select 
      product_survey_id as product_id,
      s.company_id,
      s.facility_buyer_id,
      c.facility_cultivator_id,
      COUNT(*) as surveys
    from public.survey survey
    left join public.subcompany s on s.id = survey.subcompany_id 
    left join public.company c on c.id = s.company_id
    where survey.deleted_date is null and survey.status in ('SurveySent'::survey_status_enum, 'Done'::survey_status_enum)
    group by product_survey_id, s.company_id, s.facility_buyer_id, c.facility_cultivator_id
  ) as res;
 `,
})
export default class CompanyInsightBuyerViewModel {
  @Field()
  @ViewColumn()
  id: number;

  @Field()
  @ViewColumn({ name: 'company_id' })
  companyId?: number;

  @Field()
  @ViewColumn({ name: 'facility_buyer_id' })
  facilityBuyerId?: string;

  @Field()
  @ViewColumn({ name: 'facility_cultivator_id' })
  facilityCultivatorId?: string;

  @Field(() => Number, {
    nullable: true,
  })
  @ViewColumn({ name: 'surveys' })
  surveys?: number;

  @Field(() => AppealingVisuallyEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'appealing_visually' })
  appealingVisually: AppealingVisuallyEnum;

  @Field(() => ColorEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'color' })
  color: ColorEnum;

  @Field(() => [Number], {
    nullable: false,
  })
  @ViewColumn({ name: 'aroma_smells' })
  aromaSmells: number[];

  @Field(() => NoseEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'nose' })
  nose: NoseEnum;

  @Field(() => SmokedEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'smoked' })
  smoked: SmokedEnum;

  @Field(() => ExperienceEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'experience' })
  experience: ExperienceEnum;

  @Field(() => IntoxicationEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'intoxication' })
  intoxication: IntoxicationEnum;

  @Field(() => SurveyOftenConsumeCannabisEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'often_consume_cannabis' })
  oftenConsumeCannabis: SurveyOftenConsumeCannabisEnum;

  @Field(() => PrimaryPurposeEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'primary_purpose' })
  primaryPurpose: PrimaryPurposeEnum;

  @Field(() => Int, {
    nullable: false,
    description: 'age range',
  })
  @ViewColumn({ name: 'age_range' })
  ageRange: number;

  @Field(() => SurveyGenderEnum, {
    nullable: false,
  })
  @ViewColumn({ name: 'gender' })
  gender: SurveyGenderEnum;

  @Field(() => ProductModel, { nullable: true })
  product?: ProductModel;

  @Field(() => CompanyModel, { nullable: true })
  company?: CompanyModel;
}
