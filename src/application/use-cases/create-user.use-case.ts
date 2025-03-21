import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/repository/user.repository';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(name: string, email: string, password: string): Promise<User> {
    const user = new User(Date.now().toString(), name, email, password);
    return this.userRepository.save(user);
  }
}
