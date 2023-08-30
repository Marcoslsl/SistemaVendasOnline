import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { UserService } from '../user/user.service';
import { userEntityMock } from '../user/mocks/user.mock';
import { CityService } from '../city/city.service';
import { cityEntityMock } from '../city/mock/city.mock';
import { addressEntityMock, createAddressMock } from './mock/address.mock';
import { NotFoundException } from '@nestjs/common';

describe('User2Service', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await service.create(createAddressMock, userEntityMock.id);
    expect(address).toEqual(addressEntityMock);
  });

  it('should return an error because user not found', async () => {
    jest
      .spyOn(userService, 'findOne')
      .mockRejectedValueOnce(new NotFoundException());
    expect(
      service.create(createAddressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return an error because city not found', async () => {
    jest
      .spyOn(cityService, 'findOne')
      .mockRejectedValueOnce(new NotFoundException());
    expect(
      service.create(createAddressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });
});
