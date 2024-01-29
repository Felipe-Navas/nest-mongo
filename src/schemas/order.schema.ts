import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ unique: true, required: true })
  orderId: number;

  @Prop({ required: true, trim: true })
  clientName: string;

  @Prop({ default: 0 })
  total: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  productList: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
