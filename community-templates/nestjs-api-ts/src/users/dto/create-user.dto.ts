import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User email address', example: 'john@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ description: 'User age', example: 30, required: false })
  @IsOptional()
  @IsInt({ message: 'Age must be an integer' })
  @Min(0, { message: 'Age must be at least 0' })
  @Max(150, { message: 'Age must not exceed 150' })
  age?: number;
}
