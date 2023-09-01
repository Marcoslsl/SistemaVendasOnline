import { IsNumber, IsString } from 'class-validator';
import { CategoryEntity } from '../../category/entities/category.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  price: number;

  @IsString()
  image: string;
}
