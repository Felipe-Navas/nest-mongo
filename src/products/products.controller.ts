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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto, UpdateProductDto } from 'src/dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth()
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
  @UseInterceptors(FileInterceptor('picture'))
  async create(
    @Body() body: CreateProductDto,
    @UploadedFile() picture: Express.Multer.File,
  ) {
    try {
      return await this.productsService.create(body, picture);
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
