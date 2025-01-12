import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { ProductService } from "../services/product.service";

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
    createProduct(@Body() product: Product): Promise<Product> {
        return this.productService.createProduct(product);
    }

    @Put(':id')     
    updateProduct(@Param('id') id: number, @Body() product: Product): Promise<Product> {
        return this.productService.updateProduct(id, product);
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