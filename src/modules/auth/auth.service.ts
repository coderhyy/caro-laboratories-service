import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(res) {
    res.setHeader(
      'token',
      this.jwtService.sign({
        id: '112',
        name: 'hyy',
      }),
    );

    res.send();
  }

  testToken(req) {
    const token = req.headers.token;
    return this.jwtService.verify(token);
  }
}
