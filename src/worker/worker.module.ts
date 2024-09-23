import { Module } from '@nestjs/common';

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
  providers: [AudioConsumer],
})
export class WorkerModule {}
