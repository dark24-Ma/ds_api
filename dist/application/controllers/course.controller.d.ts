import { CourseService, UploadedFile } from '../services/course.service';
import { UserType } from '../../domain/enums/user-type.enum';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(courseData: any, files: {
        file?: UploadedFile[];
        thumbnail?: UploadedFile[];
    }, req: any): Promise<{
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
    getCoursesByUserType(userType: UserType): Promise<{
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
    updateCourse(id: string, updateData: any, files: {
        file?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }): Promise<{
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
    downloadCourse(id: string, req: any): Promise<{
        url: string;
        title: string;
        type: import("../../infrastructure/course.schema").ResourceType;
    }>;
}
