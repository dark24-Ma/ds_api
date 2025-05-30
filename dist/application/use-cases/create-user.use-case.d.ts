import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/repository/user.repository';
export declare class CreateUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(name: string, email: string, password: string, firstname: string): Promise<User>;
}
