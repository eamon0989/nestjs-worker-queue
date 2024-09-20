import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getJob(id: string) {
    const job = await this.audioQueue.getJob(id);

    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }

    const state = await job.getState();
    const progress = job.progress;
    const reason = job.failedReason;
    return { id, state, progress, reason };
  }
}
