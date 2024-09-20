import { Module } from '@nestjs/common';
import { AppService } from '../app/app.service';

import { join } from 'path';
import { AudioConsumer } from './worker.processor';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
      processors: [join(__dirname, 'worker.processor.js')],
    }),
  ],
  providers: [AppService, AudioConsumer],
})
export class WorkerModule {}
