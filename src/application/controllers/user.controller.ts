import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { User } from 'src/domain/entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  async create(
    @Body()
    userData: {
      name: string;
      email: string;
      password: string;
      firstname: string;
    },
  ): Promise<User> {
    return this.createUserUseCase.execute(
      userData.name,
      userData.email,
      userData.password,
      userData.firstname,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
