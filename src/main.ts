import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useStaticAssets('public', {
    prefix: '/static',
  });
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
