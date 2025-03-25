import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { User } from 'src/domain/entities/user.entity';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly userRepository;
    constructor(createUserUseCase: CreateUserUseCase, userRepository: UserRepository);
    create(userData: {
        name: string;
        email: string;
        password: string;
        firstname: string;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
}
