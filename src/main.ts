import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { UserRepository } from './infrastructure/repository/user.repository';
// import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activer CORS
  app.enableCors({
    origin: ['http://185.97.146.99:5173', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si vous avez besoin d'envoyer des cookies ou des informations d'authentification
  });

  await app.listen(3000);
}
bootstrap();
