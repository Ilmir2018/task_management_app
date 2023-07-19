import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TodoGateway } from './gateway/todo.gateway';

@Module({
  imports: [UserModule, AuthModule],
  providers: [TodoGateway],
})
export class TodoModule {}
