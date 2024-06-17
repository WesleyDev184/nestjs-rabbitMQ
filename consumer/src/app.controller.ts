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

  @EventPattern({ key: 'order', cmd: 'placed' })
  handleOrderPlaced(@Payload() order: OrderDto, @Ctx() context: RmqContext) {
    console.log(context.getPattern());
    return this.appService.handleOrderPlaced(order);
  }

  @MessagePattern({ key: 'order', cmd: 'fetch-all' })
  getOrders(@Ctx() context: RmqContext) {
    console.log(context.getPattern());
    return this.appService.getOrders();
  }
}
