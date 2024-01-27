import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from '../dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  findAll() {
    return this.ProductModel.find();
  }

  async create(createProduct: CreateProductDto) {
    const newProduct = new this.ProductModel(createProduct);
    return newProduct.save();
  }

  async findOne(id: string) {
    return this.ProductModel.findById(id);
  }

  async delete(id: string) {
    return this.ProductModel.findByIdAndDelete(id);
  }

  async update(id: string, product: UpdateProductDto) {
    return this.ProductModel.findByIdAndUpdate(id, product, { new: true });
  }
}
