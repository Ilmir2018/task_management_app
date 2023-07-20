import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserI } from 'src/user/entities/user.interfaces';
import { UserService } from 'src/user/services/user.service';

@WebSocketGateway({
  namespace: 'todos',
  cors: { origin: ['http://localhost:4200'] },
})
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private authService: AuthService,
    private userService: UserService,
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
        console.log('Connected user', user);
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
    socket.disconnect();
  }
}
