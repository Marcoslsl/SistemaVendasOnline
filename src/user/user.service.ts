import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { createPasswordHased, validatePassword } from '../utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (userExists) {
      throw new BadRequestException('Email already exists.');
    }

    const passwordHased = await createPasswordHased(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      password: passwordHased,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(`UserId='${id}' not Found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.userRepository.delete({ id });
  }

  async findUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new NotFoundException(`User email='${email}' not Found`);
    }

    return user;
  }

  async updatePasswordUser(
    updatePasswordDto: UpdatePasswordDto,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findOne(userId);

    const passwordHased = await createPasswordHased(
      updatePasswordDto.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDto.lastPassword,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHased,
    });
  }
}
