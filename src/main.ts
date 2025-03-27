/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
// import { UserRepository } from './infrastructure/repository/user.repository';
// import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Créer le dossier uploads s'il n'existe pas
  const uploadPath = path.join(process.cwd(), 'uploads');
  const fs = require('fs');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  // Servir les fichiers statiques
  app.use('/uploads', express.static(uploadPath));

  // Activer CORS
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
