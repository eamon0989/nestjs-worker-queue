import { Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('job')
export class AppController {
  logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Post()
  postJob() {
    this.appService.addToQueue();
  }

  @Get(':id')
  getJob(@Param('id') id: string) {
    this.logger.log(`Getting job ${id}`);
    return this.appService.getJob(id);
  }
}
