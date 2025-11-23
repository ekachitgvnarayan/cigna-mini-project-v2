import { IsNotEmpty, IsNumber, IsString, IsDateString, IsIn, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0.01, { message: 'Amount must be greater than 0' })
  amount: number;

  @IsNotEmpty({ message: 'Category ID is required' })
  @IsNumber({}, { message: 'Category ID must be a number' })
  categoryId: number;

  @IsNotEmpty({ message: 'Date is required' })
  @IsDateString({}, { message: 'Date must be a valid date string' })
  date: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsString()
  @IsIn(['Pending', 'Completed'], { message: 'Status must be either Pending or Completed' })
  status: string;

  @IsNotEmpty({ message: 'Reference number is required' })
  @IsString()
  referenceNo: string;
}

