import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { CategoryModule } from "src/category-module/category.module";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        forwardRef(() => CategoryModule)
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService, TypeOrmModule]
})
export class ProductModule { }   