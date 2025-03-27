import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './infrastructure/user.schema';
import { UserController } from './application/controllers/user.controller';
import { UserRepository } from './infrastructure/repository/user.repository';
import * as dotenv from 'dotenv';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './application/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { EmailService } from './application/services/email.service';
import { NewsletterModel } from './infrastructure/newsletter.schema';
import { NewsletterController } from './application/controllers/newsletter.controller';
import { NewsletterService } from './application/services/newsletter.service';
import { NewsletterRepository } from './infrastructure/repository/newsletter.repository';
import { UserService } from './application/services/user.service';
import { NewsletterTemplateModel } from './infrastructure/newsletter-template.schema';
import { NewsletterTemplateController } from './application/controllers/newsletter-template.controller';
import { NewsletterSenderController } from './application/controllers/newsletter-send.controller';
import { NewsletterSenderService } from './application/services/newsletter-sender.service';
import { NewsletterTemplateService } from './application/services/newsletter-template.service';
import { NewsletterTemplateRepository } from './infrastructure/repository/newsletter-template.repository';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: userModel },
      { name: 'Newsletter', schema: NewsletterModel },
      { name: 'NewsletterTemplate', schema: NewsletterTemplateModel },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '3600s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    UserController,
    AuthController,
    NewsletterController,
    UserController,
    NewsletterTemplateController,
    NewsletterSenderController,
  ],
  providers: [
    UserRepository,
    CreateUserUseCase,
    AuthService,
    JwtStrategy,
    EmailService,
    NewsletterService,
    NewsletterRepository,
    UserService,
    NewsletterService,
    NewsletterSenderService,
    NewsletterTemplateService,
    NewsletterTemplateRepository,
  ],
})
export class AppModule {}
