import mapErrorMessage from './mapErrorMessage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any) => {
  if (error?.reason) return error.reason;
  if (error?.data?.message) return mapErrorMessage(error.data.message);
  if (error?.message) return mapErrorMessage(error.message);
  return 'Error';
};

export default getErrorMessage;
