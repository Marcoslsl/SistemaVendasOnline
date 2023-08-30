import { ReturnUserDto } from '../../user/dto/returnUser.dto';

export class ReturnLogin {
  user: ReturnUserDto;
  accessToken: string;
}
