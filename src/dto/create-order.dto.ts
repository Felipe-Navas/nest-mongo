import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/schemas/product.schema';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsString()
  clientName: string;

  @IsNumber()
  total: number;

  productList: Product[];
}
