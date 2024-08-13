import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
// import { ENTITIES, PostEntity } from '@lib/entities';
import { PostEntity } from '../../../entities/src/post.entity';

config({ path: join(process.cwd(), '.env') });
const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) {
    throw new Error('Environment variable DATABASE_URL is not set');
  }

  return {
    url,
    type: 'postgres',
    schema: 'public',
    logging: configService.get('IS_PROD') === 'false',
    entities: [PostEntity],
    migrationsRun: true,
    migrationsTableName: 'migrations',
    // synchronize: true,
  };
};

export const appDataSource = new DataSource(options());
