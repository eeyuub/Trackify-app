import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/categoy.service';
import { ProductModule } from 'src/product-module/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => ProductModule)
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService,TypeOrmModule]
})
export class CategoryModule {}

