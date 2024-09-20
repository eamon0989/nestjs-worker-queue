import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  addToQueue() {
    // eslint-disable-next-line no-console
    console.log('Adding job to queue', process.pid);
    return this.audioQueue.add('audio', { file: 'audio.mp3' });
  }
}
