import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { Repository } from 'typeorm';
import { InsertCartDto } from 'src/cart/dto/insert-cart.dto';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }
    return cartProduct;
  }
  async createProductInCart(
    insertCartDto: InsertCartDto,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      amount: insertCartDto.amount,
      productId: insertCartDto.productId,
      cartId,
    });
  }
  async insertProductInCart(
    insertCartDto: InsertCartDto,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.verifyProductInCart(
      insertCartDto.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createProductInCart(insertCartDto, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: this.createProductInCart(insertCartDto, cart.id),
    });
  }
}
