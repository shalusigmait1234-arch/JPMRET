export const allowOnlyNumbers = (value) => {
  if (!value) return '';
  return value.replace(/[^0-9]/g, '');
};

export const allowOnlyText = (value) => {
  if (!value) return '';
  return value.replace(/[^a-zA-Z\s]/g, '');
};

export const allowOnlyPhoneNumber = (value) => {
  if (!value) return '';
  const onlyNumbers = value.replace(/[^0-9]/g, '');
  return onlyNumbers.slice(0, 10);
};
