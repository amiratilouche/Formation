import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    const response = await this.userRepository.findOneBy({ email: email });
    if (response) {
      delete response.password;
      return response;
    }
  }

  async create(user: CreateUserDto): Promise<User> {
    const response = await this.userRepository.save(user);
    delete response.password;
    return response;
  }

  update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ email: username });
    return user;
  }
}
