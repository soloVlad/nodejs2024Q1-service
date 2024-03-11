import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User, UserWithoutPassword } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { hidePassword } from 'src/utils/user.util';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): UserWithoutPassword {
    const user = this.userService.getUserById(id);
    return hidePassword(user);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserWithoutPassword {
    const user = this.userService.createUser(createUserDto);
    return hidePassword(user);
  }

  @Put('/:id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserWithoutPassword {
    const user = this.userService.updatePassword(id, updatePasswordDto);
    return hidePassword(user);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): void {
    return this.userService.deleteUser(id);
  }
}
