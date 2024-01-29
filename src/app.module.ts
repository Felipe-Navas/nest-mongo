import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { mongoDbConnection } from './constants/constants';
import { GridFsModule } from './gridfs/gridfs.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnection),
    AuthModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    GridFsModule,
  ],
})
export class AppModule {}
