import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from 'src/dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    try {
      return await this.productsService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Product already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const product = await this.productsService.delete(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    const product = await this.productsService.update(id, body);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
