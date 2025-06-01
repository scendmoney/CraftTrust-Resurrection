import {
  DataSource,
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { CompanyModel } from '@entities/company/company.model';

@EventSubscriber()
export default class CompanySubscriber
  implements EntitySubscriberInterface<CompanyModel>
{
  constructor(private dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  public listenTo() {
    return CompanyModel;
  }

  public async afterUpdate(event: UpdateEvent<CompanyModel>) {
    await this._updateQuantity(
      event.manager,
      event.entity.id,
      event.entity.unitWeight,
    );
  }

  async _updateQuantity(
    manager: EntityManager,
    id?: number,
    unitWeight?: number,
  ) {
    if (id && unitWeight) {
      await manager.getRepository(CompanyModel).update(id, {
        quantity: () => `(select coalesce(sum(s.quantity),0) as quantity
              from public.subcompany s 
              where s.company_id = ${id} and s.deleted_date is null)`,
        quantitySold:
          () => `(select coalesce(sum(s.quantity_sold),0) as quantity_sold
              from public.subcompany s 
              where s.company_id = ${id} and s.deleted_date is null)`,
        totalGram: () => `(select coalesce(sum(s.quantity),0) as quantity
              from public.subcompany s 
              where s.company_id = ${id} and s.deleted_date is null) * ${unitWeight}`,
        totalLb: () => `((select coalesce(sum(s.quantity),0) as quantity
              from public.subcompany s 
              where s.company_id = ${id} and s.deleted_date is null) * ${unitWeight})/ 453.59237`,
      });
    }
  }
}
