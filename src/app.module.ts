import { Module } from '@nestjs/common';

import { OrderAppModule } from './order-app/order-app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category-module/category.module';
import { ProductModule } from './product-module/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'order-app',
      synchronize: true,
      autoLoadEntities: true,
    }),
    OrderAppModule,
    ProductModule,
    CategoryModule,
    ],  
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule { }
