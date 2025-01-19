import { Module } from '@nestjs/common';

import { OrderAppModule } from './order-app/order-app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category-module/category.module';
import { ProductModule } from './product-module/product.module';
import { OrderModule } from './order-module/order.module';
import { ConfigModule } from '@nestjs/config';
import { QrcodeGeneratorModule } from './qrcode-generator-module/qrcode-generator.module';
import { ConfigService } from '@nestjs/config';
import { UploadModule } from './upload-module/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' ,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    ProductModule,
    CategoryModule,
    OrderModule,
    QrcodeGeneratorModule,
    UploadModule
  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule { }
