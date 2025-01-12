import { Module } from '@nestjs/common';
import { OrderAppController } from './controllers/order-app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAppEntity } from './entities/order-app.entity';
import { OrderAppService } from './services/order-app.service';
import { NotificationSubscription } from './entities/notification-subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderAppEntity, NotificationSubscription])],
  controllers: [OrderAppController],
  providers: [OrderAppService],
})
export class OrderAppModule {}
