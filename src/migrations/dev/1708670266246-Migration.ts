import { MigrationInterface, QueryRunner } from 'typeorm';
//move to prod
export class Migration1708670266246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE public.facility as ff
            SET quantity_employee=(SELECT count(*) as count 
                    FROM public.user_to_facilities utf
                    where utf.facility_id = ff.id),
                quantity_active_employee=(SELECT count(*) as count 
                    FROM public.user_to_facilities utf
                    left join public."user" u on u.id = utf.user_id 
                    where utf.facility_id = ff.id and u.email is not null)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
