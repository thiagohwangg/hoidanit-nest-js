import { CodeAuthDto, CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { comparePasswordHelper } from '@/helper/util';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if(!user) return null;
    const isValidPassword = await comparePasswordHelper(pass, user.password)
    if(!isValidPassword) return null;
    return user
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async handleRegister(registerDto: CreateAuthDto) {
    return this.usersService.handleRegister(registerDto)
  }

  async checkCode(data: CodeAuthDto) {
    return this.usersService.handleActive(data)
  }

  async retryActive(data: string) {
    return this.usersService.retryActive(data)
  }
}