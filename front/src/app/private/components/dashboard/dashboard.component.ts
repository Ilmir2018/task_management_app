import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TodoI } from '../../iterfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  backlogItems: TodoI[] = [];
  todoItems: TodoI[] = [];
  doneItems: TodoI[] = [];

  items: TodoI[] = [
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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.sendMessage();
    this.todoService.getTodos();

    this.backlogItems = this.items.filter((item) => item.status === 'BACKLOG');
    this.todoItems = this.items.filter((item) => item.status === 'TODO');
    this.doneItems = this.items.filter((item) => item.status === 'DONE');
  }

  drop(event: CdkDragDrop<TodoI[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
