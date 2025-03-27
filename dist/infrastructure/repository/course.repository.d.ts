import { Model } from 'mongoose';
import { UserType } from '../../domain/enums/user-type.enum';
import { CourseDocument } from '../course.schema';
export declare class CourseRepository {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    create(courseData: any): Promise<CourseDocument>;
    findById(id: string): Promise<CourseDocument | null>;
    findAll(): Promise<CourseDocument[]>;
    findByUserType(userType: UserType): Promise<CourseDocument[]>;
    update(id: string, updateData: any): Promise<CourseDocument | null>;
    delete(id: string): Promise<CourseDocument | null>;
    incrementDownloadCount(id: string): Promise<void>;
}
