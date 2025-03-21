import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserRepository } from './infrastructure/repository/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // connnexion à la bd
  MongooseModule.forRoot(process.env.MONGODB_URL);
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  await app.listen(3000);
}
bootstrap();
