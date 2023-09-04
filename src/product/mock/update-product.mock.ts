import { categoryMock } from '../../category/mock/category.mock';
import { UpdateProductDto } from '../dto/update-product.dto';

export const updateProductMock: UpdateProductDto = {
  categoryId: categoryMock.id,
  image: 'sdds',
  name: 'mock',
  price: 22.5,
};
