import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const foundUser = await this.usersService.findOne(username);

    const isMatch = await bcrypt.compare(pass, foundUser?.password ?? "");
    if (foundUser && isMatch) {
      const user = {
        userId: foundUser.id,
        username: foundUser.login,
        password: foundUser.password
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_KEY }),
    };
  }
}
