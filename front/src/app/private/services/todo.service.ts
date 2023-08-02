import { Injectable } from '@angular/core';
import { tokenGetter } from 'src/app/app.module';
import { io } from 'socket.io-client';
import { TodoI } from '../private-module.iterfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  socket = io('http://localhost:3000/todos', {
    auth: {
      Authorization: tokenGetter(),
    },
  });

  public sendMessage() {
    this.socket.emit('message', 'message');
  }

  public async getTodos(): Promise<TodoI[]> {
    const answer = new Promise<TodoI[]>((res, rej) => {
      this.socket.on('todos', (todos: TodoI[]) => {
        res(todos);
        rej(new Error('Todo items not installed'));
      });
    });
    return answer;
  }
}
