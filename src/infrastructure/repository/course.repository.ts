// src/infrastructure/repository/course.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { CourseDocument } from './course.schema';
import { UserType } from '../../domain/enums/user-type.enum';
import { CourseDocument } from '../course.schema';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectModel('Course') private courseModel: Model<CourseDocument>,
  ) {}

  async create(courseData: any): Promise<CourseDocument> {
    const course = new this.courseModel(courseData);
    return course.save();
  }

  async findById(id: string): Promise<CourseDocument | null> {
    return this.courseModel.findById(id).exec();
  }

  async findAll(): Promise<CourseDocument[]> {
    return this.courseModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByUserType(userType: UserType): Promise<CourseDocument[]> {
    return this.courseModel
      .find({ accessibleTo: userType })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updateData: any): Promise<CourseDocument | null> {
    return this.courseModel
      .findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: Date.now() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<CourseDocument | null> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }

  async incrementDownloadCount(id: string): Promise<void> {
    await this.courseModel
      .findByIdAndUpdate(id, { $inc: { downloadCount: 1 } })
      .exec();
  }
}
