import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProductById(@Param('id') id: number): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createProduct(@Body() product: CreateProductDto, @UploadedFile() file: Express.Multer.File): Promise<Product> {
        return this.productService.createProduct(product, file);
    }

    @Put(':id')     
    @UseInterceptors(FileInterceptor('image'))
    updateProduct(@Param('id') id: number, @Body() product: UpdateProductDto, @UploadedFile() file: Express.Multer.File): Promise<Product> {
        return this.productService.updateProduct(id, product, file);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number): Promise<void> {
        return this.productService.deleteProduct(id);
    }

    @Get('category/:categoryId')
    getProductsByCategory(@Param('categoryId') categoryId: number): Promise<Product[]> {
        return this.productService.getProductsByCategory(categoryId);
    }
}