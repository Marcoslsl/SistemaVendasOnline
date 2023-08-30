import { UserEntity } from '../../user/entities/user.entity';
import { UserType } from '../../user/enum/user-type.enum';
import { LoginDto } from '../dto/login.dto';

export const userAuthEntityMock: UserEntity = {
  cpf: '198297832',
  createdAt: 23,
  email: 'emailmock@gmail.com',
  id: 12345,
  name: 'mockTest',
  password: '$2b$10$i0OdXGXCFWu7Naho.W/aQ.9LwBL5YxJXcBjJPKw1iumPG9OgNh7wa',
  phone: '913280428',
  typeUser: UserType.User,
  updatedAt: 89,
  addresses: [],
};

export const loginAuthMock: LoginDto = {
  email: 'emailmock@gmail.com',
  password: '000000000',
};

export const jwtMock: string = 'umJwtQualquer';
