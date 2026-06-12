export const isEmail = (
  value: string
): boolean => {
  return /^\S+@\S+\.\S+$/
    .test(value);
};

export const isPhone = (
  value: string
): boolean => {
  return /^[6-9]\d{9}$/
    .test(value);
};

export const isPincode = (
  value: string
): boolean => {
  return /^\d{6}$/
    .test(value);
};

export const onlyLetters = (
  value: string
): boolean => {
  return /^[A-Za-z ]+$/
    .test(value);
};

export const strongPassword = (
  value: string
): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    .test(value);
};

export const futureDate = (
  date: string
): boolean => {
  return new Date(date) >
    new Date();
};

export const maxLength = (
  value: string,
  length: number
): boolean => {
  return value.length <= length;
};

export const minLength = (
  value: string,
  length: number
): boolean => {
  return value.length >= length;
};