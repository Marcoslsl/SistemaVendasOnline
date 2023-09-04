import { UpdatePasswordDto } from '../dto/update-password.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: 'largePassword',
  newPassword: 'jkhas',
};

export const upddatePasswordInvalidMock: UpdatePasswordDto = {
  lastPassword: 'asas',
  newPassword: 'kajs',
};
