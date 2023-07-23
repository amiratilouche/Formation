import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await user.checkPassword(password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const userFound = await this.userService.findByEmail(user.email);
    const payload = { email: user.email, sub: user.userId };
    return {
      ...userFound,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isValid = await user.checkPassword(pass);
    if (isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
