import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { map, Observable, Subject } from 'rxjs';
import { interval } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { CreateOrderAppDto } from '../dtos/create-order-app.dto';
import { OrderAppService } from '../services/order-app.service';
import { OrderAppEntity } from '../entities/order-app.entity';
import * as webpush from 'web-push';
import { NotificationSubscription } from '../entities/notification-subscription.entity';
@Controller('order-app')
export class OrderAppController {
  //private qrCodeUrl: string = '';
  private qrCodeSubject = new Subject<OrderAppEntity>();
  private readySubject = new Subject<OrderAppEntity>();
  constructor(private readonly orderAppService: OrderAppService) {
  }

  /*  @Post('generate-qr')
   async generateNewQRCode(@Body() body: { text: string }) {
     const newQRCode = await this.generateQRCode(body.text);
     //this.qrCodeUrl = newQRCode;
     this.qrCodeSubject.next(newQRCode);
     return { success: true };
   }  */

  private async generateQRCode(text: string): Promise<string> {
    const QRCode = require('qrcode');
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.qrCodeSubject.pipe(
      map((order) => ({
        data: {
          order: order,
          timestamp: new Date()
        },
        type: 'message',
        id: new Date().getTime().toString(),
        retry: 1000
      } as MessageEvent))
    );
  }

  @Sse('sse-ready/:id')
  sseReady(@Param('id') id: number): Observable<MessageEvent> {
    return this.readySubject.pipe(
      map((order) => ({
        data: {
          order: order,
          timestamp: new Date()
        },
        type: 'message',
        id: new Date().getTime().toString(),
        retry: 1000
      } as MessageEvent))
    );
  }

  @Post('subscribe/:id')
  async subscribe(@Param('id') id: number, @Body() subscription: NotificationSubscription) {
    return await this.orderAppService.saveSubscription(subscription);
  }


  @Post('create-order')
  async createOrder(@Body() body: CreateOrderAppDto) {
    try {
      const order = await this.orderAppService.createOrder(body);
      if (order) {
        this.qrCodeSubject.next(order);
        return { success: true, qrcode: order.qrCode };
      }
      return { success: false, message: 'Failed to generate QR code' };
    } catch (error) {
      this.qrCodeSubject.error(error);
      throw error;
    }
  }

  @Post('set-ready')
  async setReady(@Body() body: { orderId: number }) {
    const order = await this.orderAppService.setReady(body.orderId);
    this.readySubject.next(order);
    return { success: true, order: order };
  }

  // push notif

  private vapidKeys = webpush.generateVAPIDKeys();

  @Get('vapid-public-key')
  getVapidPublicKey() {
    return { publicKey: this.vapidKeys.publicKey };
  }

  @Get('vapid-public-key')
  async subscribeToPush(@Body() subscription: NotificationSubscription) {
    // Instead of generating new keys, use the existing ones
    webpush.setVapidDetails(
      'mailto:your@email.com',
      this.vapidKeys.publicKey,
      this.vapidKeys.privateKey
    );

    return { publicKey: this.vapidKeys.publicKey };
  }

  @Post('set-ready')
  async setRead2(@Body() body: { orderId: number }) {
    const order = await this.orderAppService.setReady(body.orderId);
    this.readySubject.next(order);

    // Get subscription for this order
    const subscription = await this.orderAppService.getSubscription(body.orderId);

    if (subscription) {
      try {
        await webpush.sendNotification(
          subscription.subscription,
          JSON.stringify({
            title: 'Order Ready!',
            body: `Your order #${body.orderId} is ready for pickup`,
            icon: '/icon.png'
          })
        );
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }

    return { success: true, order };
  }


}
