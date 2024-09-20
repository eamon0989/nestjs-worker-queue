import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('job')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postJob() {
    this.appService.addToQueue();
  }

  @Get(':id')
  getJob(@Param('id') id: string) {
    // eslint-disable-next-line no-console
    console.log('Getting job', id);
    return this.appService.getJob(id);
  }
}
