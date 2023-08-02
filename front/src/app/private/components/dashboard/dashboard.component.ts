import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoI } from '../../private-module.iterfaces';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  backlogItems: TodoI[] = [];
  todoItems: TodoI[] = [];
  doneItems: TodoI[] = [];

  createTodoComponentDialogRef: MatDialogRef<CreateTodoComponent> | undefined;

  constructor(private todoService: TodoService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.todoService.sendMessage();
    this.todoService.getTodos().then((items: TodoI[]) => {
      this.backlogItems = items.filter((item) => item.status === 'BACKLOG');
      this.todoItems = items.filter((item) => item.status === 'TODO');
      this.doneItems = items.filter((item) => item.status === 'DONE');
    });
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

  onShowCreateTodoDilaog() {
    this.createTodoComponentDialogRef = this.matDialog.open(
      CreateTodoComponent,
      {
        minHeight: '400px',
        minWidth: '300px',
      }
    );
  }
}
