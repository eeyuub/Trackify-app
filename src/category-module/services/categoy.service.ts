import { Injectable, NotFoundException } from "@nestjs/common";
import { IsNull, Not, Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class CategoryService {

    protected categoryRepository: Repository<Category>;
    constructor(
        @InjectRepository(Category)
         categoryRepository: Repository<Category>,
    ) {
        this.categoryRepository = categoryRepository;
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException('Catégorie non trouvée');
        }
        return category;
    }
    
    async create(category: Category): Promise<Category> {
        return this.categoryRepository.save(category);
    }

    async update(id: number, category: Category): Promise<Category> {
        const existingCategory = await this.categoryRepository.findOne({ where: { id } });
        if (!existingCategory) {
            throw new NotFoundException('Catégorie non trouvée');
        }
        await this.categoryRepository.update(id, category);
        return this.categoryRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException('Catégorie non trouvée');
        }
        await this.categoryRepository.softDelete(id);
    }

    async restore(id: number): Promise<void> {
        const category = await this.categoryRepository.findOne({ where: { id , deletedAt: Not(IsNull()) },withDeleted: true});
        if (!category) {
            throw new NotFoundException('Aucune catégorie supprimée trouvée');
        }
        await this.categoryRepository.restore(id);
    }
}
