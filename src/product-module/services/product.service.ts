
import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Category } from "src/category-module/entities/category.entity";
import { CategoryService } from "src/category-module/services/categoy.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async createProduct(product: UpdateProductDto): Promise<Product> {
        const category = await this.categoryRepository.findOne({ where: { id: product.categoryId } });
        if(!category){
            throw new NotFoundException('Catégorie non trouvée');
        }
        const newProduct = this.productRepository.create(product);
        newProduct.category = category;
        return this.productRepository.save(newProduct);
    }

    async getProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getProductById(id: number): Promise<Product> {
       const product = await this.productRepository.findOne({ where: { id } });
        if(!product){
            throw new NotFoundException('Catégorie non trouvée');
        }
        return product;
    }
    async updateProduct(id: number, product: CreateProductDto): Promise<Product> {
       
        const existingProduct = await this.productRepository.findOne({ where: { id } });
        if(!existingProduct){
            throw new NotFoundException('Produit non trouvé');
        }
        const category = await this.categoryRepository.findOne({ where: { id: product.categoryId } });
        if(!category){
            throw new NotFoundException('Catégorie non trouvée');
        }
        Object.assign(existingProduct, product);
        existingProduct.category = category;
        await this.productRepository.save(existingProduct);
        return this.productRepository.findOne({ where: { id } });
    }

    async deleteProduct(id: number): Promise<void> {
        
        await this.productRepository.delete(id);
    }

    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        return this.productRepository.find({ where: { category: { id: categoryId } } });
    }

    async getProductsByCategoryName(categoryName: string): Promise<Product[]> {
        return this.productRepository.find({ where: { category: { name: categoryName } } });
    }
}   