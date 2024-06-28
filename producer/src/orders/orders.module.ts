import {
  ExchangeType,
  RabbitMQClient,
} from '@lukadriel/nestjs-rabbitmq-transporter';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'RABBITMQ_CLIENT',
      useFactory: () => {
        return new RabbitMQClient({
          urls: ['amqp://admin:admin@localhost:5672'],
          exchange: 'teste',
          exchangeType: ExchangeType.TOPIC,
          queue: 'server_queue_name',
          replyQueue: 'client_queue_name',
          replyQueueOptions: {
            exclusive: false,
          },
          noAck: true,
        });
      },
    },
  ],
})
export class OrdersModule {}
