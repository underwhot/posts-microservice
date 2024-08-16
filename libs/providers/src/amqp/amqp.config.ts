import {
  RabbitMQConfig,
  RabbitMQExchangeConfig,
} from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

const AMQP_EXCHANGES: RabbitMQExchangeConfig[] = [];

export const amqpConfig = (config: ConfigService): RabbitMQConfig => {
  const uri = config.get('AMQP_URI');
  if (!uri) {
    throw new Error('@AMQP_URI is not set');
  }

  return {
    exchanges: AMQP_EXCHANGES,
    uri,
    connectionInitOptions: { wait: false },
    connectionManagerOptions: {
      heartbeatIntervalInSeconds: 15,
      reconnectTimeInSeconds: 30,
    },
  };
};
