import { CreateOrderDto, UpdateOrderDto } from 'src/dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find();
  }

  async create(createOrder: CreateOrderDto) {
    const newOrder = new this.orderModel(createOrder);
    return newOrder.save();
  }

  async update(orderId: number, order: UpdateOrderDto) {
    return this.orderModel.findOneAndUpdate({ orderId }, order, { new: true });
  }

  async getHigherAmountOrder() {
    return this.orderModel.find().sort({ total: -1 }).limit(1); // for MAX
  }

  async getTotalSoldLastMonth() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const totalSold = await this.orderModel
      .aggregate([
        {
          $match: {
            createdAt: { $gte: lastMonth },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$total' },
          },
        },
      ])
      .exec();

    return {
      totalSoldLastMonth: totalSold.length > 0 ? totalSold[0].total : 0,
    };
  }
}
