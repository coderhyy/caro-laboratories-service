import { Controller, Get, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NoAuth } from '../../guard/noauth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @NoAuth()
  getToken(@Response() res) {
    return this.authService.getToken(res);
  }
}
