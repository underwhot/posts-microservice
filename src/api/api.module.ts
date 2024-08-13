import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/';
import { AuthModule } from '@lib/auth';

@Module({
  imports: [ControllersModule, AuthModule],
})
export class ApiModule {}
