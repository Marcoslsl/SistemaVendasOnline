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
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dto/return-product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
