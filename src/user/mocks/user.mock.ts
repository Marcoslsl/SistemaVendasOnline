import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '198297832',
  createdAt: 23,
  email: 'emailmock@gmail.com',
  id: 12345,
  name: 'mockTest',
  password: 'largePassword',
  phone: '913280428',
  typeUser: UserType.User,
  updatedAt: 89,
  addresses: [],
};

export const userCreatMock: CreateUserDto = {
  name: 'testUser',
  email: 'testuser@gmail.com',
  phone: '717393',
  cpf: '000000000',
  password: 'largePassword',
};
