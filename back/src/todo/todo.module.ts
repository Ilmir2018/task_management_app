import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TodoGateway } from './gateway/todo.gateway';
import { TodoService } from './services/todo/todo.service';
import { ConnectionService } from './services/connection/connection.service';
import { SetupService } from './services/setup/setup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entities/connection.entity';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([Connection, Todo]),
  ],
  providers: [TodoGateway, TodoService, ConnectionService, SetupService],
})
export class TodoModule {}
