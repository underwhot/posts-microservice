import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
  providers: [],
  exports: [],
  imports: [TypeormModule],
})
export class ProvidersModule {}
