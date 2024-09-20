import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Processor('audio')
export class AudioConsumer extends WorkerHost {
  constructor() {
    super();
    // Log when the worker is initialized
    console.log('AudioConsumer worker initialized');
  }

  async process(job: Job<any, any, string>): Promise<any> {
    // eslint-disable-next-line no-console
    console.log('worker', process.pid, 'processing job', job?.id, job?.data);

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

    // eslint-disable-next-line no-console
    console.log('worker', process.pid, 'finished job', job.id);
    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { value: 'This will be stored' };
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.log(
      `Job ${job.id} of type ${job.name} with data ${job.data} failed with error ${error.message}`,
    );
  }

  @OnWorkerEvent('error')
  onError(error: Error) {
    console.log(`An error occurred: ${error.message}`);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(
      `Job ${job.id} of type ${job.name} with data ${job.data} completed.`,
    );
  }
}
