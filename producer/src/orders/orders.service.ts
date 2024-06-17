import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { OrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy) {}
  placeOrder(order: OrderDto) {
    this.rabbitClient.emit({ key: 'order', cmd: 'placed' }, order);

    return { message: 'Order Placed!' };
  }

  getOrders() {
    return this.rabbitClient
      .send({ key: 'order', cmd: 'fetch-all' }, {})
      .pipe(timeout(5000));
  }
}
