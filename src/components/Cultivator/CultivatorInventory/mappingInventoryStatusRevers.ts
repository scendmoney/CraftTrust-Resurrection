import { ProductStatusEnum } from 'graphql/_server';

const mappingInventoryStatusRevers = (oldMessage?: string): ProductStatusEnum | string => {
  switch (oldMessage) {
    case 'New':
      return ProductStatusEnum.New;
    case 'Listed':
      return ProductStatusEnum.Listed;
    case 'Unlisted':
      return ProductStatusEnum.Unlisted;
    case 'Archived':
      return ProductStatusEnum.Archived;
    default:
      return 'All Products';
  }
};

export default mappingInventoryStatusRevers;
