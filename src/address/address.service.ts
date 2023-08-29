import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findOne(userId);
    console.log(createAddressDto.cityId);
    await this.cityService.findOne(createAddressDto.cityId);

    const address = { ...createAddressDto, userId };

    const addressCreated = await this.addressRepository.create(address);
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
    updateAddressDto: UpdateAddressDto,
  ): Promise<AddressEntity> {
    await this.addressRepository.update(id, updateAddressDto);
    return await this.addressRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.addressRepository.delete({ id });
  }
}
