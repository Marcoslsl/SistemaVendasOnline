import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    const addressCreated =
      await this.addressRepository.create(createAddressDto);
    await this.addressRepository.save(addressCreated);
    return addressCreated;
  }

  async findAll(): Promise<AddressEntity[]> {
    return this.addressRepository.find();
  }

  async findOne(id: number): Promise<AddressEntity | null> {
    return this.addressRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    updateCityDto: UpdateAddressDto,
  ): Promise<AddressEntity> {
    await this.addressRepository.update(id, updateCityDto);
    return await this.addressRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.addressRepository.delete({ id });
  }
}
