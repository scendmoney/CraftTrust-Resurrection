import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1711434836090 implements MigrationInterface {
  //move to prod
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` update public.company company
        set total_people_registered = (coalesce((select count(*)
            FROM public.company c
            inner join public.subcompany s on s.company_id  = c.id and s.deleted_date is null
            inner join public.survey s2 on s2.subcompany_id = s.id and s2.status != 'New'::public.survey_status_enum and s2.deleted_date is null
          where c.id = company.id),0)),
          total_people_completed = (coalesce((select count(*)
            FROM public.company c
            inner join public.subcompany s on s.company_id  = c.id and s.deleted_date is null
            inner join public.survey s2 on s2.subcompany_id = s.id and s2.status in ('SurveySent'::public.survey_status_enum, 'Done'::public.survey_status_enum) and s2.deleted_date is null
          where c.id = company.id),0)),
          total_people_redemption = (coalesce((select count(*)
            FROM public.company c
            inner join public.subcompany s on s.company_id  = c.id and s.deleted_date is null
            inner join public.survey s2 on s2.subcompany_id = s.id and s2.status in ('Done'::public.survey_status_enum) and s2.deleted_date is null
          where c.id = company.id),0))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
