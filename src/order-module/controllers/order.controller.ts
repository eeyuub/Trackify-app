import { OrderService } from "../services/order.service";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { Order } from "../entities/order.entity";
import { Body, Controller, Get, Param, Sse } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { map } from "rxjs";
import { Observable, Subject } from "rxjs";

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    private newOrderSubject = new Subject<Order>();
    @Get()
    async getAllOrders(): Promise<Order[]> {
        return this.orderService.getAllOrders();
    }

    @Sse('new-order')
    sse(): Observable<{ data: any }> {
      return this.newOrderSubject.pipe(
        map((order) => ({
          data: {
            order: order
          }
        }))
      );
    }

    @Post()
    async createOrder(@Body() order: CreateOrderDto): Promise<Order> {
        const newOrder = await this.orderService.createOrder(order);
        this.newOrderSubject.next(newOrder);
        return newOrder;
    }

    

    @Get(':id')
    async getOrderById(@Param('id') id: number): Promise<Order> {
        return this.orderService.getOrderById(id);
    }

    @Get('qrcode/:id')
    async getQrCode(@Param('id') id: number): Promise<string> {
        const qrCode = await this.orderService.getQrCode(id);
        return `<img src="${qrCode}" alt="QR Code" />`;
    }
}   
