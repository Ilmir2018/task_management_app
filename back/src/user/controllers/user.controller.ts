import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { DtoHelperService } from '../dto/dto-helper.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoginResponseI, UserI } from '../entities/user.interfaces';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private dtoHelperService: DtoHelperService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    const userEntity: UserI = await this.dtoHelperService.createUserDtoToEntity(
      createUserDto,
    );
    return this.userService.create(userEntity);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
    const userEntity: UserI = await this.dtoHelperService.loginUserDtoToEntity(
      loginUserDto,
    );
    const jwt: string = await this.userService.login(userEntity);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 10000,
    };
  }
}
