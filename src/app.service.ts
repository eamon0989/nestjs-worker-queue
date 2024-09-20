import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async addToQueue() {
    // eslint-disable-next-line no-console
    console.log('Adding job to queue', process.pid);
    try {
      return await this.audioQueue.add('audio', {
        file: 'audio.mp3',
        id: randomUUID(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  getJob(id: string) {
    return this.audioQueue.getJob(id);
  }
}
