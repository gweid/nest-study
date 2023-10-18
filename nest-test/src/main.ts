import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  // 注意要给 create 方法传入 NestExpressApplication 的泛型参数才有 useStaticAssets 这些方法
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 添加静态文件
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  await app.listen(3000);
}
bootstrap();
