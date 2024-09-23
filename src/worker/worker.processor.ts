import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Processor('audio')
export class AudioConsumer extends WorkerHost {
  logger = new Logger('AudioConsumer');

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} in PID ${process.pid}.`,
    );

    // This is an example job that just slowly reports on progress
    // while doing no work. Replace this with your own job logic.
    let progress = 0;

    // throw an error 5% of the time
    if (Math.random() < 0.05) {
      throw new Error('This job failed!');
    }

    while (progress < 100) {
      await sleep(50);
      progress += 1;
      job.updateProgress(progress);
    }

    this.logger.log(
      `Job ${job.id} of type ${job.name} completed on PID ${process.pid}.`,
    );
    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { value: 'This will be stored' };
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.log(
      `Job ${job.id} of type ${job.name} failed with error ${error.message}`,
    );
  }

  @OnWorkerEvent('error')
  onError(error: Error) {
    console.log(`An error occurred: ${error.message}`);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}...`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job ${job.id} of type ${job.name} completed.`);
  }
}
