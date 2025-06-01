const resolvePhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) {
    return '';
  }
  if (!phoneNumber.startsWith('+1')) {
    return `+1${phoneNumber}`;
  }
  return phoneNumber;
};

export default resolvePhoneNumber;
