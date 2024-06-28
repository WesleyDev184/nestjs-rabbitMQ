import { RMQMessage } from '@lukadriel/nestjs-rabbitmq-transporter/dist/interfaces/rmq-options.interface';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { OrderDto } from './order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('place')
  handleOrderPlaced(@Payload() order: any) {
    const orderDto = JSON.parse(order);
    const newOrder = new OrderDto(
      orderDto.email,
      orderDto.product,
      orderDto.quantity,
    );

    const res = this.appService.handleOrderPlaced(newOrder);

    const response: RMQMessage = {
      content: res,
      options: {
        persistent: true,
      },
    };

    return response;
  }

  @MessagePattern('get-all')
  getOrders() {
    const response: RMQMessage = {
      content: this.appService.getOrders(),
      options: {
        persistent: true,
      },
    };

    return response;
  }

  @MessagePattern('hello')
  getHello(data: any) {
    console.log('received from client: ', data);
    const response: RMQMessage = {
      content: data,
      options: {
        persistent: true,
      },
    };
    return response;
  }
}
