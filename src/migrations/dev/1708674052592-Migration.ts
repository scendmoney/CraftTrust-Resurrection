import { MigrationInterface, QueryRunner } from 'typeorm';
//move to prod
export class Migration1708674052592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE public.facility_to_facility as ff
            SET avg_purchase =(coalesce((select 
                      coalesce(avg(total), 0) as total
                    from public."order"
                    where deleted_date is null and facility_cultivator_id = ff.facility_id  and facility_buyer_id = ff.facility_rel_id 
                    and (status = 'Completed'::public.order_status_enum )
                    group by facility_cultivator_id, facility_cultivator_id),0)),
                order_total_spend =(coalesce((select 
                          coalesce(sum(total), 0) as total
                        from public."order"
                        where deleted_date is null 
                          and facility_cultivator_id = ff.facility_id
                          and facility_buyer_id = ff.facility_rel_id  
                          and (status = 'Completed'::public.order_status_enum)
                        ),0))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
