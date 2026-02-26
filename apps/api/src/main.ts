import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5050);
  console.log('URL: ', process.env.DIRECT_URL);
}
bootstrap();
