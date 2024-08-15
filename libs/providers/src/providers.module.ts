import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { apolloDriverConfig } from './graphql';

@Module({
  imports: [
    TypeormModule,
    GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig),
  ],
  providers: [],
  exports: [],
})
export class ProvidersModule {}
