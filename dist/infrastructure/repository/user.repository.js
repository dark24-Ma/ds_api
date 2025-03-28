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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
        this.users = [];
    }
    async save(user) {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async delete(id) {
        await this.userModel.findByIdAndDelete(id).exec();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findByResetToken(token) {
        return this.userModel.findOne({ resetToken: token }).exec();
    }
    async updateResetToken(userEmail, resetData) {
        return this.userModel
            .findOneAndUpdate({ email: userEmail }, {
            resetToken: resetData.resetToken,
        }, { new: true })
            .exec();
    }
    async updatePassword(userToken, newPassword) {
        return this.userModel
            .findOneAndUpdate({ resetToken: userToken }, { password: newPassword })
            .exec();
    }
    async update(userId, updateData) {
        return this.userModel
            .findByIdAndUpdate(userId, updateData, { new: true })
            .exec();
    }
    async findById(userId) {
        return this.userModel.findById(userId).exec();
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map