import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderDto } from './order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('place')
  placeOrder(@Body() order: OrderDto) {
    return this.ordersService.placeOrder(order);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('test')
  test() {
    return this.ordersService.test();
  }
}
