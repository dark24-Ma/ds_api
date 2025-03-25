import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(
    name: string,
    email: string,
    password: string,
    firstname: string,
  ): Promise<User> {
    const user = new User(
      Date.now().toString(),
      name,
      email,
      password,
      firstname,
    );
    return this.userRepository.save(user);
  }
}
