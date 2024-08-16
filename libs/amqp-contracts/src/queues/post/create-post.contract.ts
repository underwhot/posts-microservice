import { EXCHANGE_POST } from '@amqp/amqp-contracts/exchanges';
import {
  AmqpBaseRequest,
  AmqpBaseResponse,
  QueueDeclaration,
} from '@amqp/amqp-contracts/shared';
import { CreatePostRequest, CreatePostResponse } from './interfaces';

export namespace CreatePostContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_POST,
    queue: `${EXCHANGE_POST.name}-create`,
    routeKey: `${EXCHANGE_POST.name}-create`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = AmqpBaseRequest<CreatePostRequest>;

  export type response = AmqpBaseResponse<CreatePostResponse>;
}
