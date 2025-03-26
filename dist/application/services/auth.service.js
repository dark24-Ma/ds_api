"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../../domain/entities/user.entity");
const user_repository_1 = require("../../infrastructure/repository/user.repository");
const bcrypt = require("bcrypt");
const email_service_1 = require("./email.service");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, emailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async register(name, email, password, firstname) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException("L'email est déjà utilisé");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new user_entity_1.User(Date.now().toString(), name, email, hashedPassword, firstname);
        user.password = hashedPassword;
        const newUser = await this.userRepository.save(user);
        await this.emailService.sendWelcomeEmail(email, name);
        return newUser;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = {
            name: user.name,
            firstname: user.firstname,
            email: user.email,
            sub: user.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async requestResetPassword(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        const resetToken = (0, uuid_1.v4)();
        user.resetToken = resetToken;
        user.resetTokenExpiration = 0;
        await this.userRepository.updateResetToken(user.email, {
            resetToken: resetToken,
            resetTokenExpiration: new Date(),
        });
        const resetLink = `http://185.97.146.99:5173/reset-password?token=${resetToken}`;
        await this.emailService.sendPasswordResetEmail(email, resetLink);
    }
    async resetPassowrd(token, newPassword) {
        const user = await this.userRepository.findByResetToken(token);
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null;
        user.resetTokenExpiration = null;
        await this.userRepository.save(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map