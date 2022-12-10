import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import rawBodyMiddleware from './modules/features/payment/rawBody.middleware';
import { setupNestApp } from './utils/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(rawBodyMiddleware());
  setupNestApp(app);
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(' backend API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http' })
    .addTag('permissions')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
