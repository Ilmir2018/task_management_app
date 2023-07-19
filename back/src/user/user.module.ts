import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controllers/user.controller';
import { DtoHelperService } from './dto/dto-helper.service';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, DtoHelperService],
  exports: [UserService],
})
export class UserModule {}
