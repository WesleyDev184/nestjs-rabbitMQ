import {
  ExchangeType,
  RabbitMQServer,
} from '@lukadriel/nestjs-rabbitmq-transporter';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new RabbitMQServer({
        queue: 'server_queue_name',
        exchange: 'teste',
        exchangeType: ExchangeType.TOPIC,
        urls: ['amqp://admin:admin@localhost:5672'],
        noAck: true,
      }),
    },
  );
  app.listen();
}
bootstrap();
