import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  async create(@Body() body: CreateOrderDto) {
    try {
      return await this.ordersService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Order with orderId already exists');
      }
      throw error;
    }
  }

  @Put(':orderId')
  async update(
    @Param('orderId') orderId: number,
    @Body() body: UpdateOrderDto,
  ) {
    const product = await this.ordersService.update(orderId, body);
    if (!product) throw new NotFoundException('Order not found');
    return product;
  }

  @Get('get-higher')
  async getHigherAmountOrder() {
    return this.ordersService.getHigherAmountOrder();
  }

  @Get('total-sold-last-month')
  async getTotalSoldLastMonth() {
    return this.ordersService.getTotalSoldLastMonth();
  }
}
