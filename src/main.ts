import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  // eslint-disable-next-line no-console
  console.log('Application is running on: http://localhost:3000');
  // eslint-disable-next-line no-console
  console.log(process.env.REDIS_URL);
}
bootstrap();
