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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ROLES_KEY, Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dto/return-product.dto';

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
  findProducById(@Param('id') id: string) {
    return this.productService.findProducById(+id);
  }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }
  //
  @Delete(':id')
  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}
