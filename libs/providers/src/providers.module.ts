import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { apolloDriverConfig } from './graphql';
import { AmqpModule } from './amqp/amqp.module';

@Module({
  imports: [
    TypeormModule,
    GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig),
    AmqpModule,
  ],
  providers: [],
  exports: [],
})
export class ProvidersModule {}
