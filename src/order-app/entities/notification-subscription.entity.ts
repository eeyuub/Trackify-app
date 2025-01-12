import { Entity } from "typeorm";
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

interface PushSubscriptionKeys {
    p256dh: string;
    auth: string;
}

interface WebPushSubscription {
    endpoint: string;
    keys: PushSubscriptionKeys;
}

@Entity()
export class NotificationSubscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column('json')
    subscription: WebPushSubscription;  // This is the correct type
  
    @CreateDateColumn()
    createdAt: Date;
}       