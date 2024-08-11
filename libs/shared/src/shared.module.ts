import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExcentionsFilter } from './filters';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExcentionsFilter,
    },
  ],
  exports: [],
})
export class SharedModule {}
