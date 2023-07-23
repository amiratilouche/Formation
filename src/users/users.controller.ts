import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

require('dotenv').config();

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    const hashedPassword = bcrypt.hashSync(
      user.password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
    );

    const isFound = await this.userService.findByEmail(user.email);

    if (isFound) {
      throw new Error('User with the same email or username already exists');
    }
    return this.userService.create({
      ...user,
      password: hashedPassword,
    });
  }
  //  Methode GET 
  //@desc: methode to get all users 
  //Path "/users"
  @Get("users")
  @UseGuards(AuthGuard('jwt'))
  async getAll() {
    const users = await this.userService.getAll();
    users.forEach(function (user) {
      delete user.password;
    });
    return { users };
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return { user };
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
