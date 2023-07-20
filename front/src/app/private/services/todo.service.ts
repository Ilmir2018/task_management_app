import { Injectable } from '@angular/core';
import { tokenGetter } from 'src/app/app.module';
import { io } from 'socket.io-client';

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
}
