import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserI } from 'src/user/entities/user.interfaces';
import { UserService } from 'src/user/services/user.service';
import { ConnectionService } from '../services/connection/connection.service';
import { TodoService } from '../services/todo/todo.service';

@WebSocketGateway({
  namespace: 'todos',
  cors: { origin: ['http://localhost:4200'] },
})
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private connectionService: ConnectionService,
    private todoService: TodoService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(
        socket.handshake.auth.Authorization,
      );
      const user: UserI = await this.userService.getOne(decodedToken.user.id);
      if (!user) {
        console.log('disconnect user');
        return this.disconnect(socket);
      } else {
        await this.connectionService.create({
          socketId: socket.id,
          connectedUser: user,
        });

        const todos = await this.todoService.findAll();

        return this.server.to(socket.id).emit('todos', todos);
      }
    } catch {
      console.log('disconnect user');
      return this.disconnect(socket);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  async handleDisconnect(socket: Socket) {
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect();
  }
}
