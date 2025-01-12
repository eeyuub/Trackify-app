import { CreateOrderProductDto } from "./create-order-product.dto";

export class CreateOrderDto {
    products: CreateOrderProductDto[];
    totalPrice: number;
}