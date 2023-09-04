import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { BlobOptions } from 'buffer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findCategoryById(
      createProductDto.categoryId,
    );
    const product = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
      },
    });

    if (product) {
      throw new BadRequestException('Product alredy exists');
    }

    return await this.productRepository.save({ ...product, category });
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async findProducById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product: ${product} not found`);
    }

    return product;
  }
  //
  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }
  //
  async deleteProduct(id: number): Promise<DeleteResult> {
    await this.findProducById(id);
    return await this.productRepository.delete({ id });
  }
}
