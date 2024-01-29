import { Connection, Model } from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class GridFsService {
  private gridFSBucket: GridFSBucket;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
    this.gridFSBucket = new GridFSBucket(this.connection.db, {
      bucketName: 'productPictures',
    });
  }

  async storePicture(fileBuffer: Buffer, filename: string) {
    const uploadStream = this.gridFSBucket.openUploadStream(filename);
    uploadStream.write(fileBuffer);
    uploadStream.end();
    return uploadStream.id;
  }
}
