import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryEntityMock } from './mock/category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryEntityMock]),
            save: jest.fn().mockRejectedValue(categoryEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });
  it('should return a list of category', async () => {
    const category = await service.findAll();
    expect(category).toEqual([categoryEntityMock]);
  });
  it('should return an error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return an error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAll()).rejects.toThrowError();
  });
});
