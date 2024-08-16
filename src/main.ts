import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Posts')
    .setDescription('CRUD API for Posts')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () => {
    Logger.log(`Application is running on: http://localhost:${port}`, 'Main');
    Logger.log(
      `Swagger is running on: http://localhost:${port}/api-docs`,
      'Main',
    );
    Logger.log(
      `GraphQL playground is running on: http://localhost:${port}/graphql`,
      'Main',
    );
  });
}
bootstrap();
