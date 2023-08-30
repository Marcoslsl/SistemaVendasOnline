import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';
import { cityEntityMock } from './mock/city.mock';
import { CacheService } from '../cache/cache.service';

describe('User2Service', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityEntityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should find a city', async () => {
    const city = await service.findOne(cityEntityMock.id);
    expect(city).toEqual(cityEntityMock);
  });

  it('should return an error when city not found', async () => {
    jest.spyOn(cityRepository, 'findOneBy').mockResolvedValue(undefined);
    expect(service.findOne(cityEntityMock.id)).rejects.toThrowError();
  });

  it('should cities', async () => {
    const city = await service.getAllCitiesByStateId(cityEntityMock.id);
    expect(city).toEqual([cityEntityMock]);
  });
});
