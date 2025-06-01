import {
  DataSource,
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { SubcompanyModel } from './subcompany.model';
import { CompanyModel } from '@entities/company/company.model';

@EventSubscriber()
export default class SubcompanySubscriber
  implements EntitySubscriberInterface<SubcompanyModel>
{
  constructor(private dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  public listenTo() {
    return SubcompanyModel;
  }

  public async afterUpdate(event: UpdateEvent<SubcompanyModel>) {
    await this._updateQuantity(event.manager, event.entity.id);
  }

  public async afterInsert(event: InsertEvent<SubcompanyModel>) {
    await this._updateQuantity(event.manager, event.entity.id);
  }

  public async afterSoftRemove(event: SoftRemoveEvent<SubcompanyModel>) {
    await this._updateQuantity(event.manager, event.entity.id);
  }

  async _updateQuantity(manager: EntityManager, id: number) {
    if (id) {
      const subcompany = await manager.getRepository(SubcompanyModel).findOne({
        where: {
          id,
        },
        withDeleted: true,
        relations: ['company'],
      });

      if (subcompany) {
        await manager
          .getRepository(CompanyModel)
          .update(subcompany.__company__.id, {
            quantity: () => `(select coalesce(sum(s.quantity),0) as quantity
              from public.subcompany s 
              where s.company_id = ${subcompany.__company__.id} and s.deleted_date is null)`,
            quantitySold:
              () => `(select coalesce(sum(s.quantity_sold),0) as quantity_sold
              from public.subcompany s 
              where s.company_id = ${subcompany.__company__.id} and s.deleted_date is null)`,
            totalGram: () => `(select coalesce(sum(s.quantity),0) as quantity
              from public.subcompany s 
              where s.company_id = ${subcompany.__company__.id} and s.deleted_date is null) * ${subcompany.__company__.unitWeight}`,
            totalLb: () => `((select coalesce(sum(s.quantity),0) as quantity
              from public.subcompany s 
              where s.company_id = ${subcompany.__company__.id} and s.deleted_date is null) * ${subcompany.__company__.unitWeight})/ 453.59237`,
          });
      }
    }
  }
}
