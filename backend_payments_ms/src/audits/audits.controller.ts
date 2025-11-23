import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AuditsService } from './audits.service';

@Controller('api/audit')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Get()
  async findAll(
    @Query('paymentRef') paymentRef?: string,
    @Query('action') action?: string,
  ) {
    if (paymentRef) {
      return await this.auditsService.findByPaymentRef(paymentRef);
    }
    if (action) {
      return await this.auditsService.findByAction(action);
    }
    return await this.auditsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.auditsService.findOne(id);
  }
}
