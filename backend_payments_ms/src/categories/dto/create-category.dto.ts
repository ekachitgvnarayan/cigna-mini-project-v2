import { IsNotEmpty, IsString, IsIn, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString()
  @MaxLength(100)
  categoryName: string;

  @IsNotEmpty({ message: 'Type is required' })
  @IsString()
  @IsIn(['Incoming', 'Outgoing'], { message: 'Type must be either Incoming or Outgoing' })
  type: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsString()
  @IsIn(['Active', 'Inactive'], { message: 'Status must be either Active or Inactive' })
  status: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  manager?: string;
}
