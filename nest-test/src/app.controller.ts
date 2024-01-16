import { Controller, Get, Query, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('get-ip-info')
  getIpInfo(@Query('ip') ip: string) {
    return this.appService.getIpInfo(ip);
  }
}
