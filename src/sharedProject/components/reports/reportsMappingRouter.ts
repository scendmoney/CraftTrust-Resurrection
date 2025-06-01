import { RequestStatusEnum } from 'graphql/_server';

const reportsMappingRouter = (route?: string): string => {
  switch (route) {
    case RequestStatusEnum.Closed:
      return 'Completed';
    default:
      return '--';
  }
};

export default reportsMappingRouter;
