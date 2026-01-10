import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User unique identifier', example: 1 })
  id: number;

  @ApiProperty({ description: 'User email address', example: 'john@example.com' })
  email: string;

  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'User age', example: 30, required: false })
  age?: number;

  @ApiProperty({ description: 'Account creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
