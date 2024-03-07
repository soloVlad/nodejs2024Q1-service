import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { getCurrentTimestamp } from 'src/utils/date.util';

import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const user: User = {
      id: uuid(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    this.users.push(user);
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.getUserById(id);

    user.password = updatePasswordDto.newPassword;
    return user;
  }

  deleteUser(id: string): void {
    const found = this.users.find((user) => user.id === id);
    this.users = this.users.filter((user) => user.id !== found.id);
  }
}
