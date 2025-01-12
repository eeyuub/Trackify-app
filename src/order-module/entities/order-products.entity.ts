import { Order } from "./order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/product-module/entities/product.entity";

@Entity()
export class OrderProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.products, { nullable: true })  // Add this relation
    order: Order;

    @ManyToOne(() => Product, (product) => product.id, { eager: true })
    product: Product;

    @Column({ default: 1 })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;
}
