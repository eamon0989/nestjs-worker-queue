import { Module } from '@nestjs/common';
import { AppService } from '../app/app.service';

import { join } from 'path';
import { AudioConsumer } from './worker.processor';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
      connection: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      },
      processors: [join(__dirname, 'worker.processor.js')],
    }),
  ],
  providers: [AppService, AudioConsumer],
})
export class WorkerModule {}
