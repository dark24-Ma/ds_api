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
exports.SubscriptionTypeModel = exports.SubscriptionTypeSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SubscriptionTypeSchema = class SubscriptionTypeSchema {
};
exports.SubscriptionTypeSchema = SubscriptionTypeSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], SubscriptionTypeSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SubscriptionTypeSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SubscriptionTypeSchema.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SubscriptionTypeSchema.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], SubscriptionTypeSchema.prototype, "features", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], SubscriptionTypeSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], SubscriptionTypeSchema.prototype, "updatedAt", void 0);
exports.SubscriptionTypeSchema = SubscriptionTypeSchema = __decorate([
    (0, mongoose_1.Schema)()
], SubscriptionTypeSchema);
exports.SubscriptionTypeModel = mongoose_1.SchemaFactory.createForClass(SubscriptionTypeSchema);
//# sourceMappingURL=subscription-type.schema.js.map