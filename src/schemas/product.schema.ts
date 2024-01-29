import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ unique: true, required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  sku: string;

  @Prop(
    raw({
      fileId: { type: Types.ObjectId, required: true },
      filename: { type: String, required: true },
    }),
  )
  picture: {
    fileId: Types.ObjectId;
    filename: string;
  };

  @Prop({ default: 0 })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
