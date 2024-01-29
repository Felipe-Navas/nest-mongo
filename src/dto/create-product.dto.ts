import * as mongoose from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  sku: string;

  picture: {
    fileId: mongoose.Types.ObjectId;
    filename: string;
    originalname: string;
  };

  price: number;
}
