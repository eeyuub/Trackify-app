import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { CategoryModule } from "src/category-module/category.module";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";
import { UploadModule } from "src/upload-module/upload.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        forwardRef(() => CategoryModule),
        forwardRef(() => UploadModule)
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService, TypeOrmModule]
})
export class ProductModule { }   