import { IsOptional, IsString, IsIn, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  categoryName?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Incoming', 'Outgoing'], { message: 'Type must be either Incoming or Outgoing' })
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Active', 'Inactive'], { message: 'Status must be either Active or Inactive' })
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  manager?: string;
}
