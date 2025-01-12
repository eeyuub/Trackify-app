import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "../services/categoy.service";
import { Category } from "../entities/category.entity";

@Controller('categories')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }  

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id);
    }

    @Post()
    create(@Body() category: Category) {
        return this.categoryService.create(category);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() category: Category) {
        return this.categoryService.update(+id, category);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoryService.delete(+id);
    }

    @Put(':id/restore')
    restore(@Param('id') id: string) {
        return this.categoryService.restore(+id);
    }
}
