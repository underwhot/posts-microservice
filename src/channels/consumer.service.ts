import { CreatePostContract } from '@amqp/amqp-contracts';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PostFacade } from '@lib/post/application-services';
import { Logger, Module } from '@nestjs/common';

@Module({})
export class ConsumerModule {
  private readonly logger = new Logger(ConsumerModule.name);
  constructor(private readonly postFacade: PostFacade) {}

  @RabbitRPC({
    exchange: CreatePostContract.queue.exchange.name,
    routingKey: CreatePostContract.queue.routeKey,
    queue: CreatePostContract.queue.queue,
  })
  private async createPost(
    request: CreatePostContract.request,
  ): Promise<CreatePostContract.response> {
    const { payload: post, ...requestMessage } = request;

    try {
      const createdPost = await this.postFacade.commands.createPost(post);
      return {
        ...requestMessage,
        payload: {
          ...createdPost,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ...requestMessage,
        payload: null,
        error: this.errorHandler(error),
      };
    }
  }
  private errorHandler(error: any) {
    return {
      code: error?.name || 'error',
      message: error?.message || JSON.stringify(error),
    };
  }
}
