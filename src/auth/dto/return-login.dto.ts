import { ReturnUserDto } from 'src/user/dto/returnUser.dto';

export class ReturnLogin {
  user: ReturnUserDto;
  accessToken: string;
}
