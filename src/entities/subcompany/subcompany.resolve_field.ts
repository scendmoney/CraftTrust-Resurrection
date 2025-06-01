import { ResolveField, Resolver } from '@nestjs/graphql';
import { SubcompanyModel } from './subcompany.model';

@Resolver(() => SubcompanyModel)
export class SubcompanyResolveField {
  @ResolveField('URLForQRInvite', () => String)
  async URLForQRInvite(): Promise<string> {
    try {
      return null;
    } catch (error) {
      return null;
    }
  }
}
