import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dto/returnUser.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.create(createUserDto));
  }

  @Get()
  async findAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAll()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<UserEntity> {
  //   return this.userService.findOne(+id);
  // }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.findUserByIdUsingRelations(userId),
    );
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @UserId() userId: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePasswordDto, userId);
  }
}
