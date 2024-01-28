import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_HOST || 'localhost'}:27017/nest-mongo`,
    ),
    AuthModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
  ],
})
export class AppModule {}
