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
const user_schema_1 = require("./infrastructure/repository/user.schema");
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
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.userModel }]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'defaultSecret',
                signOptions: { expiresIn: '3600s' },
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [
            user_repository_1.UserRepository,
            create_user_use_case_1.CreateUserUseCase,
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            email_service_1.EmailService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map