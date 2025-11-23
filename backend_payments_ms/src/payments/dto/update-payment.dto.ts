import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';

// export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}

import { IsOptional, IsNumber, IsString, IsDateString, IsIn, Min } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0.01, { message: 'Amount must be greater than 0' })
  amount?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Category ID must be a number' })
  categoryId?: number;

  @IsOptional()
  @IsDateString({}, { message: 'Date must be a valid date string' })
  date?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Pending', 'Completed'], { message: 'Status must be either Pending or Completed' })
  status?: string;

  @IsOptional()
  @IsString()
  referenceNo?: string;
}


