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
exports.NewsletterTemplateModel = exports.NewsletterTemplateSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let NewsletterTemplateSchema = class NewsletterTemplateSchema {
};
exports.NewsletterTemplateSchema = NewsletterTemplateSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], NewsletterTemplateSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NewsletterTemplateSchema.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NewsletterTemplateSchema.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], NewsletterTemplateSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], NewsletterTemplateSchema.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], NewsletterTemplateSchema.prototype, "status", void 0);
exports.NewsletterTemplateSchema = NewsletterTemplateSchema = __decorate([
    (0, mongoose_1.Schema)()
], NewsletterTemplateSchema);
exports.NewsletterTemplateModel = mongoose_1.SchemaFactory.createForClass(NewsletterTemplateSchema);
//# sourceMappingURL=newsletter-template.schema.js.map