import { returnCityDto } from '../../city/dto/return-city.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: returnCityDto;
  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new returnCityDto(address.city) : undefined;
  }
}
