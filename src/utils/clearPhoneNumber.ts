const clearPhoneNumber = (phone?: string): string => {
  if (!phone) {
    return '';
  }
  return phone.replace(/[^\d+]/g, '');
};

export default clearPhoneNumber;
