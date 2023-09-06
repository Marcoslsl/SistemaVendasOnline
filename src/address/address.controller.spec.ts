import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { addressEntityMock, createAddressMock } from './mock/address.mock';
import { userEntityMock } from '../user/mocks/user.mock';

describe('AddressController', () => {
  let controller: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AddressService,
          useValue: {
            create: jest.fn().mockResolvedValue(addressEntityMock),
          },
        },
      ],
      controllers: [AddressController],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('shoul be defined', () => {
    expect(controller).toBeDefined();
    expect(addressService).toBeDefined();
  });

  it('shoud return address entity in createAddress ', async () => {
    const address = await controller.create(
      createAddressMock,
      userEntityMock.id,
    );
    expect(address).toEqual(addressEntityMock);
  });
});
