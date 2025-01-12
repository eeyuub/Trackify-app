import { PrimaryGeneratedColumn } from "typeorm";
import { Column, Entity } from "typeorm";

@Entity()
export class OrderAppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({ type: 'float' })
  quantity: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column()
  status: string;

  @Column({ type: 'text', nullable: true })
  qrCode: string;
}