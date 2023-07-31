import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { TodoI } from 'src/todo/todo.interface';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoReposytory: Repository<Todo>,
  ) {}

  async findAll(): Promise<TodoI[]> {
    return await this.todoReposytory.find();
  }

  async saveAll(todoItems: TodoI[]): Promise<TodoI[]> {
    return await this.todoReposytory.save(todoItems);
  }
}
