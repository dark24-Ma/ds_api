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
exports.userModel = exports.UserSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../domain/entities/user.entity");
const user_type_enum_1 = require("../domain/enums/user-type.enum");
let UserSchema = class UserSchema extends user_entity_1.User {
};
exports.UserSchema = UserSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "firstname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UserSchema.prototype, "resetToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: user_type_enum_1.UserType, default: user_type_enum_1.UserType.CLIENT }),
    __metadata("design:type", String)
], UserSchema.prototype, "userType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UserSchema.prototype, "phonenumber", void 0);
exports.UserSchema = UserSchema = __decorate([
    (0, mongoose_1.Schema)()
], UserSchema);
exports.userModel = mongoose_1.SchemaFactory.createForClass(UserSchema);
//# sourceMappingURL=user.schema.js.map