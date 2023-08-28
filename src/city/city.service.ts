import { Inject, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<CityEntity> {
    const cityCreated = await this.cityRepository.create(createCityDto);
    await this.cityRepository.save(cityCreated);
    return cityCreated;
  }

  async findAll(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async findOne(id: number): Promise<CityEntity | null> {
    return this.cityRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<CityEntity> {
    await this.cityRepository.update(id, updateCityDto);
    return await this.cityRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.cityRepository.delete({ id });
  }

  async getAllCitiesByStateId(stateId: number) {
    const cietiesCache = await this.cacheManager.get(`${stateId}`);

    if (cietiesCache) {
      return cietiesCache;
    }

    const cities = await this.cityRepository.findBy({ stateId });
    await this.cacheManager.set(`${stateId}`, cities);
    return cities;
  }
}
