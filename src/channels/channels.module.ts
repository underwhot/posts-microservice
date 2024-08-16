import { Module } from '@nestjs/common';
import { ConsumerModule } from './consumer.service';

@Module({
  imports: [ConsumerModule]
})
export class ChannelsModule {}
