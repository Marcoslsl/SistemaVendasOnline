import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ROLES_KEY, Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dto/return-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin)
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ReturnProduct> {
    return new ReturnProduct(
      await this.productService.create(createProductDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnProduct[]> {
    return (await this.productService.findAll()).map(
      (product) => new ReturnProduct(product),
    );
  }

  @Get(':id')
  async findProducById(@Param('id') id: string) {
    return await this.productService.findProducById(+id);
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin)
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(+id);
  }
}
