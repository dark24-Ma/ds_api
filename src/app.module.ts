/* eslint-disable @typescript-eslint/no-var-requires */
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
import { CourseModel } from './infrastructure/course.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
// import * as crypto from 'crypto';
import { CourseController } from './application/controllers/course.controller';
import { CourseSenderController } from './application/controllers/course-sender.controller';
import { CourseService } from './application/services/course.service';
import { CourseSenderService } from './application/services/course-sender.service';
import { FileUploadService } from './application/services/file-upload.service';
import { CourseRepository } from './infrastructure/repository/course.repository';
// import { SubscriptionTypeController } from './application/controllers/subscription-type.controller';
import { UserSubscriptionController } from './application/controllers/user-subscription.controller';
import { SubscriptionTypeService } from './application/services/subscription-type.service';
import { UserSubscriptionService } from './application/services/user-subscription.service';
import { SubscriptionTypeRepository } from './infrastructure/repository/subscription-type.repository';
import { UserSubscriptionRepository } from './infrastructure/repository/user-subscription.repository';
import { SubscriptionTypeModel } from './infrastructure/subscription-type.schema';
import { UserSubscriptionModel } from './infrastructure/user-subscription.schema';
import { SubscriptionTypeController } from './application/controllers/subscription-type.controller';
// import { SubscriptionTypeModel } from './infrastructure/repository/subscription-type.schema';
// import { UserSubscriptionModel } from './infrastructure/repository/user-subscription.schema';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: userModel },
      { name: 'Newsletter', schema: NewsletterModel },
      { name: 'NewsletterTemplate', schema: NewsletterTemplateModel },
      { name: 'Course', schema: CourseModel },
      { name: 'SubscriptionType', schema: SubscriptionTypeModel },
      { name: 'UserSubscription', schema: UserSubscriptionModel },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Créer le dossier s'il n'existe pas
          const uploadPath = path.join(process.cwd(), 'uploads');
          require('fs').mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + path.extname(file.originalname));
        },
      }),
    }),
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
    CourseController,
    CourseSenderController,
    SubscriptionTypeController,
    UserSubscriptionController,
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
    CourseService,
    CourseSenderService,
    FileUploadService,
    CourseRepository,
    SubscriptionTypeService,
    UserSubscriptionService,
    SubscriptionTypeRepository,
    UserSubscriptionRepository,
  ],
})
export class AppModule {}
