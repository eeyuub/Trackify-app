import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { Product } from "../../product-module/entities/product.entity";
import { OrderProducts } from "../entities/order-products.entity";
import { NotFoundException } from "@nestjs/common";
import { QrcodeGeneratorService } from "src/qrcode-generator-module/services/qrcode-generator.service";
import { ConfigService } from "@nestjs/config";
import { OrderStatus } from "../enums/order-status.enum";


export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(OrderProducts)
        private orderProductsRepository: Repository<OrderProducts>,
        private qrcodeGeneratorService: QrcodeGeneratorService,
        private configService: ConfigService
    ) {}

    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async createOrder(order: CreateOrderDto): Promise<Order> {
        // Create and save the initial order first
        const initOrder = await this.orderRepository.save(
            this.orderRepository.create({
                products: [],
                totalPrice: order.totalPrice
            })
        );
    
        for (const orderProduct of order.products) {
            const productEntity = await this.productRepository.findOne({ 
                where: { id: orderProduct.productId }
            });
            
            if (!productEntity) {
                throw new Error(`Product with id ${orderProduct.productId} not found`);
            }
    
            const productTotalPrice = orderProduct.price * orderProduct.quantity;
            
            // Create and save the order product with the saved order reference
            const newProduct = await this.orderProductsRepository.save(
                this.orderProductsRepository.create({
                    product: productEntity,
                    quantity: orderProduct.quantity,
                    price: orderProduct.price,
                    totalPrice: productTotalPrice,
                    order: initOrder
                })
            );
    
            initOrder.products.push(newProduct);
        }
    
        // Update the order with the final products array
        initOrder.qrCode = await this.generateOrderQrCode(initOrder);
        return this.orderRepository.save(initOrder);
    }

    async generateOrderQrCode(order: Order): Promise<string> {
        const qrCode = await this.qrcodeGeneratorService.generateQRCode(this.configService.get('QRCODE_BASE_URL') + order.id.toString());
        return qrCode;
    }

    async getOrderById(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException('Commande non trouvée');
        }
        return order;
    }

    async getQrCode(id: number): Promise<string> {
        const order = await this.getOrderById(id);
        return order.qrCode;
    }

    async setOrderStatus(id: number, status: OrderStatus): Promise<Order> {
        const order = await this.getOrderById(id);
        order.status = OrderStatus.READY;
        return this.orderRepository.save(order);
    }
}
