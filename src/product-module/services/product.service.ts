
import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Category } from "src/category-module/entities/category.entity";
import { CategoryService } from "src/category-module/services/categoy.service";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @Inject(forwardRef(() => CategoryService))
        private categoryService: CategoryService
    ) {}

    async createProduct(product: Product): Promise<Product> {
        const newProduct = this.productRepository.create(product);
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
    async updateProduct(id: number, product: Product): Promise<Product> {
        await this.productRepository.update(id, product);
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