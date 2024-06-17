import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { OrderDto } from './order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('order-placed')
  handleOrderPlaced(@Payload() order: OrderDto) {
    return this.appService.handleOrderPlaced(order);
  }

  @MessagePattern({ cmd: 'fetch-orders' })
  getOrders(@Ctx() context: RmqContext) {
    console.log(context.getPattern());
    return this.appService.getOrders();
  }
}
