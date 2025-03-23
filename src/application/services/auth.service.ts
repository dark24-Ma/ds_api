import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    firstname: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
      Date.now().toString(),
      name,
      email,
      hashedPassword,
      firstname,
    );
    user.password = hashedPassword;
    const newUser = await this.userRepository.save(user);

    await this.emailService.sendWelcomeEmail(email, name);
    return newUser;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
