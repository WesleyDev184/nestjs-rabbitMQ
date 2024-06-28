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

    console.log(`Order placed - customer: ${order.email}\n`);

    return `order ${order.id} Placed`;
  }

  getOrders() {
    console.log(`Returning all orders - ${this.orders.length} in total\n`);
    return JSON.stringify(this.orders);
  }
}
