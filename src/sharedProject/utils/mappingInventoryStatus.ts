import { ProductStatusEnum } from 'graphql/_server';

const mappingInventoryStatus = (oldMessage?: ProductStatusEnum | undefined): string => {
  switch (oldMessage) {
    case ProductStatusEnum.New:
      return 'New';
    case ProductStatusEnum.Listed:
      return 'Listed';
    case ProductStatusEnum.Unlisted:
      return 'Unlisted';
    case ProductStatusEnum.Archived:
      return 'Archived';
    default:
      return '--';
  }
};

export default mappingInventoryStatus;
