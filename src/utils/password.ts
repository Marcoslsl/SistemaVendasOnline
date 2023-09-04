import { compare, hash } from 'bcrypt';

export const createPasswordHased = async (
  password: string,
): Promise<string> => {
  return hash(password, 10);
};

export const validatePassword = async (
  password: string,
  passwordHased: string,
): Promise<boolean> => {
  return compare(password, passwordHased);
};
