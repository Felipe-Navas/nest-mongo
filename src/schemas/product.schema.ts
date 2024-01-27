import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ unique: true, required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  sku: string;

  @Prop()
  picture: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
