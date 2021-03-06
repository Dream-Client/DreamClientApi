import { Controller, Get } from '@nestjs/common';
import { FrontendService } from './frontend.service';

@Controller()
export class FrontendController {
  constructor(private readonly frontendService: FrontendService) {}

  @Get('*')
  public async get() {
    return this.frontendService.getApp();
  }
}
