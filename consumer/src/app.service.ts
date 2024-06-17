import { Injectable } from '@nestjs/common';
import { OrderDto } from './order.dto';

@Injectable()
export class AppService {
  orders: OrderDto[] = [];

  handleOrderPlaced(order: OrderDto) {
    console.log(`Received a new order - customer: ${order.email}\n`);
    order.id = this.orders.length + 1;

    this.orders.push(order);
    //Send email
  }

  getOrders() {
    console.log(`Returning all orders - ${this.orders.length} in total\n`);
    return this.orders;
  }
}
