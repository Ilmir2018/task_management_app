import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserI } from 'src/user/entities/user.interfaces';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: UserI): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 12);
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return bcryptjs.compare(password, storedPasswordHash);
  }

  async verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
