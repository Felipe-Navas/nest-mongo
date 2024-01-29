import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GridFsModule } from 'src/gridfs/gridfs.module';
import { GridFsService } from 'src/gridfs/gridfs.service';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    GridFsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, GridFsService],
})
export class ProductsModule {}
