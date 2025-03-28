"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./infrastructure/user.schema");
const user_controller_1 = require("./application/controllers/user.controller");
const user_repository_1 = require("./infrastructure/repository/user.repository");
const dotenv = require("dotenv");
const create_user_use_case_1 = require("./application/use-cases/create-user.use-case");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./application/controllers/auth.controller");
const auth_service_1 = require("./application/services/auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./application/strategies/jwt.strategy");
const email_service_1 = require("./application/services/email.service");
const newsletter_schema_1 = require("./infrastructure/newsletter.schema");
const newsletter_controller_1 = require("./application/controllers/newsletter.controller");
const newsletter_service_1 = require("./application/services/newsletter.service");
const newsletter_repository_1 = require("./infrastructure/repository/newsletter.repository");
const user_service_1 = require("./application/services/user.service");
const newsletter_template_schema_1 = require("./infrastructure/newsletter-template.schema");
const newsletter_template_controller_1 = require("./application/controllers/newsletter-template.controller");
const newsletter_send_controller_1 = require("./application/controllers/newsletter-send.controller");
const newsletter_sender_service_1 = require("./application/services/newsletter-sender.service");
const newsletter_template_service_1 = require("./application/services/newsletter-template.service");
const newsletter_template_repository_1 = require("./infrastructure/repository/newsletter-template.repository");
const course_schema_1 = require("./infrastructure/course.schema");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const course_controller_1 = require("./application/controllers/course.controller");
const course_sender_controller_1 = require("./application/controllers/course-sender.controller");
const course_service_1 = require("./application/services/course.service");
const course_sender_service_1 = require("./application/services/course-sender.service");
const file_upload_service_1 = require("./application/services/file-upload.service");
const course_repository_1 = require("./infrastructure/repository/course.repository");
const user_subscription_controller_1 = require("./application/controllers/user-subscription.controller");
const subscription_type_service_1 = require("./application/services/subscription-type.service");
const user_subscription_service_1 = require("./application/services/user-subscription.service");
const subscription_type_repository_1 = require("./infrastructure/repository/subscription-type.repository");
const user_subscription_repository_1 = require("./infrastructure/repository/user-subscription.repository");
const subscription_type_schema_1 = require("./infrastructure/subscription-type.schema");
const user_subscription_schema_1 = require("./infrastructure/user-subscription.schema");
const subscription_type_controller_1 = require("./application/controllers/subscription-type.controller");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI),
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.userModel },
                { name: 'Newsletter', schema: newsletter_schema_1.NewsletterModel },
                { name: 'NewsletterTemplate', schema: newsletter_template_schema_1.NewsletterTemplateModel },
                { name: 'Course', schema: course_schema_1.CourseModel },
                { name: 'SubscriptionType', schema: subscription_type_schema_1.SubscriptionTypeModel },
                { name: 'UserSubscription', schema: user_subscription_schema_1.UserSubscriptionModel },
            ]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (req, file, cb) => {
                        const uploadPath = path.join(process.cwd(), 'uploads');
                        require('fs').mkdirSync(uploadPath, { recursive: true });
                        cb(null, uploadPath);
                    },
                    filename: (req, file, cb) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, uniqueSuffix + path.extname(file.originalname));
                    },
                }),
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'defaultSecret',
                signOptions: { expiresIn: '3600s' },
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [
            user_controller_1.UserController,
            auth_controller_1.AuthController,
            newsletter_controller_1.NewsletterController,
            user_controller_1.UserController,
            newsletter_template_controller_1.NewsletterTemplateController,
            newsletter_send_controller_1.NewsletterSenderController,
            course_controller_1.CourseController,
            course_sender_controller_1.CourseSenderController,
            subscription_type_controller_1.SubscriptionTypeController,
            user_subscription_controller_1.UserSubscriptionController,
        ],
        providers: [
            user_repository_1.UserRepository,
            create_user_use_case_1.CreateUserUseCase,
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            email_service_1.EmailService,
            newsletter_service_1.NewsletterService,
            newsletter_repository_1.NewsletterRepository,
            user_service_1.UserService,
            newsletter_service_1.NewsletterService,
            newsletter_sender_service_1.NewsletterSenderService,
            newsletter_template_service_1.NewsletterTemplateService,
            newsletter_template_repository_1.NewsletterTemplateRepository,
            course_service_1.CourseService,
            course_sender_service_1.CourseSenderService,
            file_upload_service_1.FileUploadService,
            course_repository_1.CourseRepository,
            subscription_type_service_1.SubscriptionTypeService,
            user_subscription_service_1.UserSubscriptionService,
            subscription_type_repository_1.SubscriptionTypeRepository,
            user_subscription_repository_1.UserSubscriptionRepository,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map