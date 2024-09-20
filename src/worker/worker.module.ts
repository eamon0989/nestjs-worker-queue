import { Module } from '@nestjs/common';
import { AppService } from '../app/app.service';

import { AudioConsumer } from './worker.processor';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
      connection: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      },
    }),
  ],
  providers: [AppService, AudioConsumer],
})
export class WorkerModule {}
