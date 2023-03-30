import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  testToken(req) {
    const token = req.headers.token;
    return this.jwtService.verify(token);
  }

  async login(user: LoginDto) {
    const { username, password } = user;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (!existUser) {
      throw new BadRequestException('用户名不正确！');
    }

    if (!compareSync(password, existUser.password)) {
      throw new BadRequestException('密码错误！');
    }

    const token = this.createToken({
      id: existUser.id,
      username: existUser.username,
      role: existUser.role,
    });

    return { token };
  }
}
