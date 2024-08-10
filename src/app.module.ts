import { ProvidersModule } from '@lib/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
