import { userEntityMock } from '../../user/mocks/user.mock';
import { AddressEntity } from '../entities/address.entity';
import { cityEntityMock } from '../../city/mock/city.mock';
import { CreateAddressDto } from '../dto/create-address.dto';

export const addressEntityMock: AddressEntity = {
  id: 1,
  userId: userEntityMock.id,
  complement: 'no complement',
  numberAddress: 0,
  cep: '12212',
  cityId: cityEntityMock.id,
  createdAt: 12,
  updatedAt: 12,
};

export const createAddressMock: CreateAddressDto = {
  complement: 'no complement',
  numberAddress: 10,
  cep: '2323',
  cityId: cityEntityMock.id,
};
