import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'orders-queue',
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
