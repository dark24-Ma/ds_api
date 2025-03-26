import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { EmailService } from './email.service';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private emailService;
    constructor(userRepository: UserRepository, jwtService: JwtService, emailService: EmailService);
    register(name: string, email: string, password: string, firstname: string, userType: string): Promise<User>;
    validateUser(email: string, password: string): Promise<User | null>;
    login(user: User): Promise<{
        access_token: string;
    }>;
    requestResetPassword(email: string): Promise<void>;
    resetPassowrd(token: string, newPassword: string): Promise<void>;
}
