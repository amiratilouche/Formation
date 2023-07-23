import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post('todo')
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() todo: Todo): Promise<Todo> {
    todo.id = id;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.todoService.remove(id);
  }
}
