import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createProductMock, productMock } from './mock/product.mock';
import { CategoryService } from '../category/category.service';
import { categoryMock } from '../category/mock/category.mock';

describe('ProductService', () => {
  let service: ProductService;
  let categoryService: CategoryService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
            findOne: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const producst = await service.findAll();
    expect(producst).toEqual([productMock]);
  });

  it('should return error if empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrow();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAll()).rejects.toThrow();
  });

  it('should return a product', async () => {
    const producst = await service.create(createProductMock);
    expect(producst).toEqual(productMock);
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(productMock);
    expect(service.create(createProductMock)).rejects.toThrow();
  });
  it('should return error in save data', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());
    expect(service.create(createProductMock)).rejects.toThrow();
  });
});
