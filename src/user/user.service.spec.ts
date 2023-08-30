import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userCreatMock, userEntityMock } from './mocks/user.mock';

describe('User2Service', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
            findOne: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });
  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);
    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockRejectedValue(new Error());
    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return user in findOne', async () => {
    const user = await service.findOne(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findOne', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);
    expect(service.findOne(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return error in findOne (error DB)', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockRejectedValue(new Error());
    expect(service.findOne(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in findUserByIdUsingRelations', async () => {
    const user = await service.findUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return an error if user exists', async () => {
    expect(service.create(userCreatMock)).rejects.toThrowError();
  });

  it('should return user if user not exists', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockRejectedValue(undefined);
    expect(await service.create(userCreatMock)).toEqual(userEntityMock);
  });
});
