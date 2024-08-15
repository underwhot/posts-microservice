import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/';
import { AuthModule } from '@lib/auth';
import { ResolversModule } from './resolvers/';
import { PostResolver } from './resolvers/post/post.resolver';

@Module({
  imports: [ControllersModule, AuthModule, ResolversModule],
  providers: [PostResolver],
})
export class ApiModule {}
