import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}
