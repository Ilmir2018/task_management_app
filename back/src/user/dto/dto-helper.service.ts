import { Injectable } from '@nestjs/common';
import { UserI } from '../entities/user.interfaces';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class DtoHelperService {
  createUserDtoToEntity(createUserDto: CreateUserDto): UserI {
    return {
      email: createUserDto.email,
      password: createUserDto.password,
      username: createUserDto.username,
    };
  }

  loginUserDtoToEntity(createUserDto: LoginUserDto): UserI {
    return {
      email: createUserDto.email,
      password: createUserDto.password,
    };
  }
}
