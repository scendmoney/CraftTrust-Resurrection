import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1711440462646 implements MigrationInterface {
  //move to prod
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE public.company as company
        SET 
         quantity = (select coalesce(sum(s.quantity),0) as quantity
          from public.subcompany s 
          where s.company_id = company2.id and s.deleted_date is null),
         quantity_sold = (select coalesce(sum(s.quantity_sold),0) as quantity_sold
          from public.subcompany s 
          where s.company_id = company2.id and s.deleted_date is null),
         total_gram=(select coalesce(sum(s.quantity),0) as quantity
              from public.subcompany s 
              where s.company_id = company.id and s.deleted_date is null) * company.unit_weight,
         total_lb=((select coalesce(sum(s.quantity),0) as quantity
              from public.subcompany s 
              where s.company_id = company.id and s.deleted_date is null) * company.unit_weight)/ 453.59237
        FROM public.company as company2
        LEFT JOIN public.subcompany AS sb ON sb.company_id = company2.id
        WHERE company2.id = company.id;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
