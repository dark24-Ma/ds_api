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
exports.CourseRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CourseRepository = class CourseRepository {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async create(courseData) {
        const course = new this.courseModel(courseData);
        return course.save();
    }
    async findById(id) {
        return this.courseModel.findById(id).exec();
    }
    async findAll() {
        return this.courseModel.find().sort({ createdAt: -1 }).exec();
    }
    async findByUserType(userType) {
        return this.courseModel
            .find({ accessibleTo: userType })
            .sort({ createdAt: -1 })
            .exec();
    }
    async update(id, updateData) {
        return this.courseModel
            .findByIdAndUpdate(id, { ...updateData, updatedAt: Date.now() }, { new: true })
            .exec();
    }
    async delete(id) {
        return this.courseModel.findByIdAndDelete(id).exec();
    }
    async incrementDownloadCount(id) {
        await this.courseModel
            .findByIdAndUpdate(id, { $inc: { downloadCount: 1 } })
            .exec();
    }
};
exports.CourseRepository = CourseRepository;
exports.CourseRepository = CourseRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Course')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseRepository);
//# sourceMappingURL=course.repository.js.map