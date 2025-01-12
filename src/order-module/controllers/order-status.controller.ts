import { Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { OrderStatus, getFormelDescription, getInformelDescription, getStatus } from '../enums/order-status.enum';
import { OrderStatusResponseDto } from '../dtos/order-status-response.dto';
import { Order } from '../entities/order.entity';
import { map, Observable, Subject } from 'rxjs';
import { OrderService } from '../services/order.service';


@Controller('order-status')
export class OrderStatusController {
    constructor(private orderService: OrderService) {}
    private orderSubjects: Map<number, Subject<Order>> = new Map();

    @Get()
    getOrderStatuses(): OrderStatusResponseDto[] {
        return Object.values(OrderStatus).map(status => ({
            value: status,
            label: getStatus(status),
            formelDescription: getFormelDescription(status),
            informelDescription: getInformelDescription(status)
        }));
    }
    
    @Sse(':id/track-order')
    trackOrder(@Param('id') id: number): Observable<{ data: any }> {
        // Create new subject for this order if it doesn't exist
        if (!this.orderSubjects.has(id)) {
            this.orderSubjects.set(id, new Subject<Order>());
        }
        
        return this.orderSubjects.get(id).pipe(
            map((order) => ({
                data: { order }
            }))
        );
    }

    @Post(':id/ready')
    async readyOrder(@Param('id') id: number): Promise<Order> {
        const readyOrder = await this.orderService.setOrderStatus(id, OrderStatus.READY);
        this.orderSubjects.get(id).next(readyOrder);
        return readyOrder;
    }

    @Post(':id/cancel')
    async cancelOrder(@Param('id') id: number): Promise<Order> {
        const cancelOrder = await this.orderService.setOrderStatus(id, OrderStatus.CANCELLED);
        this.orderSubjects.get(id).next(cancelOrder);
        return cancelOrder;
    }

    @Post(':id/delivered')
    async deliveredOrder(@Param('id') id: number): Promise<Order> {
        const deliveredOrder = await this.orderService.setOrderStatus(id, OrderStatus.DELIVERED);
        this.orderSubjects.get(id).next(deliveredOrder);
        return deliveredOrder;
    }
}