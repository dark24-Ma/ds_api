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
exports.CourseModel = exports.CourseSchema = exports.ResourceType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var ResourceType;
(function (ResourceType) {
    ResourceType["PDF"] = "pdf";
    ResourceType["VIDEO"] = "video";
    ResourceType["LINK"] = "link";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
let CourseSchema = class CourseSchema {
};
exports.CourseSchema = CourseSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CourseSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CourseSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], CourseSchema.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ResourceType, required: true }),
    __metadata("design:type", String)
], CourseSchema.prototype, "resourceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CourseSchema.prototype, "resourceUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CourseSchema.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], CourseSchema.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], CourseSchema.prototype, "accessibleTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], CourseSchema.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], CourseSchema.prototype, "downloadCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], CourseSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], CourseSchema.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], CourseSchema.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: String, ref: 'SubscriptionType' }], default: [] }),
    __metadata("design:type", Array)
], CourseSchema.prototype, "requiredSubscriptionTypes", void 0);
exports.CourseSchema = CourseSchema = __decorate([
    (0, mongoose_1.Schema)()
], CourseSchema);
exports.CourseModel = mongoose_1.SchemaFactory.createForClass(CourseSchema);
//# sourceMappingURL=course.schema.js.map