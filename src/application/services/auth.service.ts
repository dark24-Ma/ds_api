import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';
import { v4 as uuidv4 } from 'uuid';
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
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException("L'email est déjà utilisé");
    }

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

  async requestResetPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    const resetToken = uuidv4();
    user.resetToken = resetToken;
    user.resetTokenExpiration = 0;
    await this.userRepository.updateResetToken(user.email, {
      resetToken: resetToken,
      resetTokenExpiration: new Date(),
    });

    const resetLink = `http://185.97.146.99:5173/reset-password?token=${resetToken}`;

    await this.emailService.sendPasswordResetEmail(email, resetLink);
  }

  async resetPassowrd(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findByResetToken(token);
    // console.log(user.password);
    /* if (!user || user.resetTokenExpiration < Date.now()) {
      throw new NotFoundException('Token de réalisation invalide');
    } */

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await this.userRepository.save(user);
  }
}
