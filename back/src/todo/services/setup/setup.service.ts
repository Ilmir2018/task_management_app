import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TodoI } from 'src/todo/todo.interface';
import { TodoService } from '../todo/todo.service';

@Injectable()
export class SetupService implements OnApplicationBootstrap {
  constructor(private todoService: TodoService) {}

  onApplicationBootstrap() {
    const items: TodoI[] = [
      {
        title: 'Hard Item',
        complexity: 'HARD',
        subTitle: 'Hard Subtitle',
        text: 'Hard Text',
        status: 'BACKLOG',
      },
      {
        title: 'Medium Item',
        complexity: 'MEDIUM',
        subTitle: 'Medium Subtitle',
        text: 'Medium Text',
        status: 'TODO',
      },
      {
        title: 'Easy Item',
        complexity: 'EASY',
        subTitle: 'Easy Subtitle',
        text: 'Easy Text',
        status: 'DONE',
      },
      {
        title: 'Hard Item',
        complexity: 'HARD',
        subTitle: 'Hard Subtitle',
        text: 'Hard Text',
        status: 'BACKLOG',
      },
    ];

    this.todoService.saveAll(items);
  }
}
