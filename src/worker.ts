import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker/worker.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  await app.listen(process.env.PORT || 3001);
  // eslint-disable-next-line no-console
  console.log('Application is running on: http://localhost:3001');
  // eslint-disable-next-line no-console
  console.log(process.env.REDIS_URL);
}
bootstrap();
