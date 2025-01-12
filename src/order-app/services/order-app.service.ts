import { InjectRepository } from "@nestjs/typeorm";
import { OrderAppEntity } from "../entities/order-app.entity";
import { Repository } from "typeorm";
import { CreateOrderAppDto } from "../dtos/create-order-app.dto";
import { NotificationSubscription } from "../entities/notification-subscription.entity";


export class OrderAppService {

    constructor(
        @InjectRepository(OrderAppEntity)
        private orderAppRepository: Repository<OrderAppEntity>,
        @InjectRepository(NotificationSubscription)
        private notificationSubscriptionRepository: Repository<NotificationSubscription>,
    ) { }

    async generateQRCode(orderId: number): Promise<string> {
        const baseUrl = 'order-track.html?id=5';
        const QRCode = require('qrcode');
        try {
            return await QRCode.toDataURL(baseUrl + orderId.toString());
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async createOrder(order: CreateOrderAppDto): Promise<OrderAppEntity> {
        const object = this.orderAppRepository.create(order);
        const savedOrder = await this.orderAppRepository.save(object);
        const qrCode = await this.generateQRCode(savedOrder.id); 
        savedOrder.qrCode = qrCode;
        await this.orderAppRepository.save(savedOrder);
        return savedOrder;
    }

    async setReady(orderId: number): Promise<OrderAppEntity> {
        const order = await this.orderAppRepository.findOne({ where: { id: orderId } });
        order.status = 'ready';
        return await this.orderAppRepository.save(order);
    }

    async saveSubscription(subscription: NotificationSubscription): Promise<NotificationSubscription> {
        const object = this.notificationSubscriptionRepository.create(subscription);
        return await this.notificationSubscriptionRepository.save(object);
    }

    async getSubscription(orderId: number): Promise<NotificationSubscription> {
        return await this.notificationSubscriptionRepository.findOne({ where: { orderId } });
    }

}
