import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusController } from './controllers/order-status.controller';
import { OrderProducts } from './entities/order-products.entity';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { ProductModule } from 'src/product-module/product.module';
import { OrderController } from './controllers/order.controller';
import { QrcodeGeneratorModule } from 'src/qrcode-generator-module/qrcode-generator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProducts]),
    forwardRef(() => ProductModule),
    forwardRef(() => QrcodeGeneratorModule) 
  ],
  controllers: [OrderStatusController, OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}

