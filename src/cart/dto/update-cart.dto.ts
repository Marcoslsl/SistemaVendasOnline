import { PartialType } from '@nestjs/mapped-types';
import { InsertCartDto } from './insert-cart.dto';

export class UpdateCartDto extends PartialType(InsertCartDto) {}
