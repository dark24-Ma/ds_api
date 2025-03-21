import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './infrastructure/repository/user.schema';
import { UserController } from './application/controllers/user.controller';
import { UserRepository } from './infrastructure/repository/user.repository';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: 'User', schema: userModel }]),
  ],
  controllers: [UserController],
  providers: [UserRepository],
})
export class AppModule {}
