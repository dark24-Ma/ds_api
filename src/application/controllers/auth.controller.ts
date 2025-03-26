import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      firstname: string;
      userType: string;
    },
  ) {
    return this.authService.register(
      body.name,
      body.email,
      body.password,
      body.firstname,
      body.userType,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Put('reset-password')
  async resetPassword(@Body() body: { resetToken: string; password: string }) {
    if (!body.resetToken || !body.password) {
      // console.log(body.password);
      throw new BadRequestException('Token et nouveau mot de passe requis');
    }
    return this.authService.resetPassowrd(body.resetToken, body.password);
  }

  @Post('request-reset-password')
  async requestResetPawwaord(@Body() body: { email: string }) {
    return this.authService.requestResetPassword(body.email);
  }
}
