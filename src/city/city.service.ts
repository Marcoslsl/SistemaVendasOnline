import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<CityEntity> {
    return await this.cityRepository.save(createCityDto);
  }

  async findAll(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async findOne(id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOneBy({
      id,
    });

    if (!city) {
      throw new NotFoundException(`CitiId='${id}' not Found`);
    }

    return city;
  }

  // async update(id: number, updateCityDto: UpdateCityDto): Promise<CityEntity> {
  //   await this.cityRepository.update(id, updateCityDto);
  //   return await this.cityRepository.findOneBy({ id });
  // }
  //
  // async remove(id: number) {
  //   return await this.cityRepository.delete({ id });
  // }

  async getAllCitiesByStateId(stateId: number) {
    return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
      this.cityRepository.findBy({ stateId }),
    );
  }
}
