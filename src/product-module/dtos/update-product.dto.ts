import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    categoryId: number;
    
    @IsOptional()
    setImageAsNull: boolean = false;
}