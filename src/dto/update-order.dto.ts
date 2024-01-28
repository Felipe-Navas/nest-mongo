import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from 'src/schemas/product.schema';

export class UpdateOrderDto {
  @IsNumber()
  @IsOptional()
  orderId?: number;

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsNumber()
  @IsOptional()
  total?: number;

  productList: Product[];
}
