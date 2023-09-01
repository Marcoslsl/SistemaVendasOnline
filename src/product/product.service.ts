import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
      },
    });

    if (product) {
      throw new BadRequestException('Product alredy exists');
    }

    return await this.productRepository.save(createProductDto);
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }
  //
  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
