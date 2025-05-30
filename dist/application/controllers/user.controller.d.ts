import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { User } from 'src/domain/entities/user.entity';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly userRepository;
    private readonly userService;
    constructor(createUserUseCase: CreateUserUseCase, userRepository: UserRepository, userService: UserService);
    create(userData: {
        name: string;
        email: string;
        password: string;
        firstname: string;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
    updateUser(userId: string, updateData: any): Promise<{
        _id: string;
        name: string;
        email: string;
        userType: string;
    }>;
}
