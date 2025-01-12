import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProducts } from "./order-products.entity";
import { OrderStatus } from "../enums/order-status.enum";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.order, { cascade: true ,eager: true})  // Changed from orderProducts.id
    products: OrderProducts[];

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    totalPrice: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
    status: OrderStatus;

    @Column({ type: 'text', nullable: true })
    qrCode: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
