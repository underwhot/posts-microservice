import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExcentionsFilter } from './filters';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExcentionsFilter,
    },
  ],
  exports: [],
})
export class SharedModule {}
