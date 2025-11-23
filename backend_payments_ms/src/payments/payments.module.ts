import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from '../database/entities/payment.entity';
import { Audit } from '../database/entities/audit.entity';
import { Category } from '../database/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Audit, Category])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
