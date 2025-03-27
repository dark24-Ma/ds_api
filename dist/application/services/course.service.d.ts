import { CourseRepository } from '../../infrastructure/repository/course.repository';
import { FileUploadService } from './file-upload.service';
import { UserType } from '../../domain/enums/user-type.enum';
export interface UploadedFile {
    buffer?: Buffer;
    originalname?: string;
    mimetype?: string;
    filename?: string;
    path?: string;
    destination?: string;
    fieldname?: string;
    encoding?: string;
    size?: number;
}
export declare class CourseService {
    private courseRepository;
    private fileUploadService;
    constructor(courseRepository: CourseRepository, fileUploadService: FileUploadService);
    createCourse(courseData: any, file?: UploadedFile, thumbnail?: UploadedFile): Promise<{
        id: any;
        title: any;
        description: any;
        tags: any;
        resourceType: any;
        resourceUrl: any;
        thumbnailUrl: any;
        duration: any;
        accessibleTo: any;
        isFeatured: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
    }>;
    getCourseById(id: string): Promise<{
        id: any;
        title: any;
        description: any;
        tags: any;
        resourceType: any;
        resourceUrl: any;
        thumbnailUrl: any;
        duration: any;
        accessibleTo: any;
        isFeatured: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
    }>;
    getAllCourses(): Promise<{
        id: any;
        title: any;
        description: any;
        tags: any;
        resourceType: any;
        resourceUrl: any;
        thumbnailUrl: any;
        duration: any;
        accessibleTo: any;
        isFeatured: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
    }[]>;
    getCoursesForUserType(userType: UserType): Promise<{
        id: any;
        title: any;
        description: any;
        tags: any;
        resourceType: any;
        resourceUrl: any;
        thumbnailUrl: any;
        duration: any;
        accessibleTo: any;
        isFeatured: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
    }[]>;
    updateCourse(id: string, updateData: any, file?: UploadedFile, thumbnail?: UploadedFile): Promise<{
        id: any;
        title: any;
        description: any;
        tags: any;
        resourceType: any;
        resourceUrl: any;
        thumbnailUrl: any;
        duration: any;
        accessibleTo: any;
        isFeatured: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
    }>;
    deleteCourse(id: string): Promise<{
        message: string;
    }>;
    downloadCourse(id: string, userType: UserType): Promise<{
        url: string;
        title: string;
        type: import("../../infrastructure/course.schema").ResourceType;
    }>;
    private formatCourseResponse;
}
