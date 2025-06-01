import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import CompanyInsightViewModel from './company.insight.view.model';
import { DataSource } from 'typeorm';
import { ProductModel } from '@entities/product/product.model';
import { CompanyModel } from './company.model';

@Resolver(() => CompanyInsightViewModel)
export default class CompanyInsightBuyerViewResolveField {
  constructor(private readonly dataSource: DataSource) {}

  @ResolveField('product')
  async product(
    @Parent() view: CompanyInsightViewModel,
  ): Promise<ProductModel> {
    return this.dataSource.getRepository(ProductModel).findOne({
      where: {
        id: view.id,
      },
    });
  }

  @ResolveField('company')
  async company(
    @Parent() view: CompanyInsightViewModel,
  ): Promise<CompanyModel> {
    if (view.companyId) {
      return this.dataSource.getRepository(CompanyModel).findOne({
        where: {
          id: view.companyId,
        },
      });
    }
    return null;
  }
}
