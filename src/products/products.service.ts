import { CreateProductDto, UpdateProductDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GridFsService } from 'src/gridfs/gridfs.service';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly gridFsService: GridFsService,
  ) {}

  findAll() {
    return this.productModel.find();
  }

  async create(createProduct: CreateProductDto, picture: Express.Multer.File) {
    const fileId = await this.gridFsService.storePicture(
      picture.buffer,
      picture.originalname,
    );

    const newProduct = new this.productModel({
      ...createProduct,
      picture: { fileId, filename: picture.originalname },
    });
    return await newProduct.save();
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  async delete(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  async update(id: string, product: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }
}
