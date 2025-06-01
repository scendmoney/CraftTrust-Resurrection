import { format, parseISO } from 'date-fns';
import splitCamelCase from 'utils/splitCamelCase';

const currentFilterStatusButtonMap = (columnName: string, value: string[]) => {
  switch (columnName) {
    case 'packagedDate':
      return value.length > 1
        ? `${formatDate(value[0])} - ${formatDate(value[1])}`
        : 'Harvest Date';
    case 'price':
      return value.length > 1 ? `$${value[0]} - $${value[1]}` : '';
    case 'carat':
      return value.length > 1 ? `${value[0]} - ${value[1]}` : '';
    case 'labTestingState':
      return value.length > 1
        ? `Test Passed, Retest Passed`
        : value.length === 1
        ? `${splitCamelCase(value[0])}`
        : '';
    case 'status':
    case 'paymentStatus':
      return value.length === 1 ? `${splitCamelCase(value[0])}` : '';
    case 'id':
      return value.length === 1 ? `#${value[0]}` : '';
    case 'quantity':
      return value.length > 1 ? `${value[0]} lb - ${value[1]} lb` : 'Quantity';
    case 'item.unitThcPercent':
      return value.length > 1 ? `THC ${value[0]} % - ${value[1]} %` : 'THC';
    case 'item.unitCbdPercent':
      return value.length > 1 ? `CBD ${value[0]} % - ${value[1]} %` : 'CBD';
    case 'dates.createdDate':
      return value.length > 1 ? `${formatDate(value[0])} - ${formatDate(value[1])}` : 'Date';

    default:
      return (value || []).join(', ');
  }
};

const formatDate = (dateStr: string) => {
  return format(parseISO(dateStr), 'MM.dd.yy');
};

export default currentFilterStatusButtonMap;
