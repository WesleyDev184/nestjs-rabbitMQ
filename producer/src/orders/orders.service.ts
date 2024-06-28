import { RMQMessage } from '@lukadriel/nestjs-rabbitmq-transporter/dist/interfaces/rmq-options.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(@Inject('RABBITMQ_CLIENT') private rabbitClient: ClientProxy) {}
  placeOrder(order: OrderDto) {
    const msg: RMQMessage = {
      content: JSON.stringify(order),
      options: {
        persistent: true,
      },
    };
    this.rabbitClient.send('place', msg).subscribe((data) => {
      console.log('response: ', data);
    });

    return { message: 'Order Placed!' };
  }

  getOrders() {
    return this.rabbitClient.send('get-all', {});
  }

  test() {
    const msg: RMQMessage = {
      content: 'hey there',
      options: {
        persistent: true,
      },
    };
    this.rabbitClient.send('hello', msg).subscribe((data) => {
      console.log('response: ', data);
    });
    return 'message sent';
  }
}
