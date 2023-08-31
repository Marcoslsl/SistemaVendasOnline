import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';

export const createCategoryMock: CreateCategoryDto = {
  name: 'createCategoryMock',
};

export const categoryMock: CategoryEntity = {
  id: 12,
  name: 'createEntityMock',
  createdAt: 12,
  updatedAt: 12,
};
