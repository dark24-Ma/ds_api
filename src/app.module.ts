import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './infrastructure/repository/user.schema';
import { UserController } from './application/controllers/user.controller';
import { UserRepository } from './infrastructure/repository/user.repository';
import * as dotenv from 'dotenv';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './application/controllers/auth.controller';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'User', schema: userModel }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserRepository, CreateUserUseCase],
})
export class AppModule {}
