const mappingAge = (oldMessage?: number): string => {
  switch (oldMessage) {
    case 1:
      return '21-27';
    case 2:
      return '28-43';
    case 3:
      return '44-59';
    case 4:
      return '60-78';
    case 5:
      return '79-96';
    default:
      return '21-27';
  }
};

export default mappingAge;
