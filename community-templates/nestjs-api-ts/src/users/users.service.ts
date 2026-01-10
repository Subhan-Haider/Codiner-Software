import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'john@example.com',
      name: 'John Doe',
      age: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      email: 'jane@example.com',
      name: 'Jane Smith',
      age: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private nextId = 3;

  create(createUserDto: CreateUserDto): User {
    // Check if email already exists
    const existingUser = this.users.find(user => user.email === createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user: User = {
      id: this.nextId++,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  findAll(limit?: number, offset?: number): User[] {
    let result = this.users;

    if (offset) {
      result = result.slice(offset);
    }

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }

  findOne(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if email is being updated and already exists
    if (updateUserDto.email) {
      const existingUser = this.users.find(
        user => user.email === updateUserDto.email && user.id !== id
      );
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number): void {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(userIndex, 1);
  }

  getTotalCount(): number {
    return this.users.length;
  }
}
