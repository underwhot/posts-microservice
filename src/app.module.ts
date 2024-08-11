import { ProvidersModule } from '@lib/providers';
import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
