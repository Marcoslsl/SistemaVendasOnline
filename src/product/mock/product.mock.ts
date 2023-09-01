import { categoryMock } from '../../category/mock/category.mock';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: 12,
  id: 12,
  image: 'http://image.com',
  name: 'name product mock',
  price: 34.4,
  updatedAt: 12,
};

export const createProductMock: CreateProductDto = {
  name: 'Mock',
  categoryId: categoryMock.id,
  price: 12,
  image: 'http://image.com',
};
