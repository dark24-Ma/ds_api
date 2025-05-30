import { CourseRepository } from '../../infrastructure/repository/course.repository';
import { FileUploadService } from './file-upload.service';
import { UserSubscriptionService } from './user-subscription.service';
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
    private userSubscriptionService;
    constructor(courseRepository: CourseRepository, fileUploadService: FileUploadService, userSubscriptionService: UserSubscriptionService);
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
        isFreeAccess: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
        resources: any;
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
        isFreeAccess: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
        resources: any;
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
        isFreeAccess: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
        resources: any;
    }[]>;
    getFreeCourses(): Promise<{
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
        isFreeAccess: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
        resources: any;
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
        isFreeAccess: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
        resources: any;
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
        isFreeAccess: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
        resources: any;
    }>;
    deleteCourse(id: string): Promise<{
        message: string;
    }>;
    downloadCourse(id: string, userType: UserType): Promise<{
        url: string;
        title: string;
        type: import("../../infrastructure/course.schema").ResourceType;
    }>;
    downloadFreeCourse(id: string): Promise<{
        url: string;
        title: string;
        type: import("../../infrastructure/course.schema").ResourceType;
    }>;
    getCourseForViewing(id: string, resourceId: string | null, userType: UserType | null): Promise<{
        filePath: string;
        title: string;
        type: string;
    }>;
    canAccessCourse(userId: string, courseId: string): Promise<boolean>;
    addResourceToCourse(courseId: string, resourceData: any, file?: UploadedFile): Promise<import("../../infrastructure/course.schema").CourseDocument>;
    removeResourceFromCourse(courseId: string, resourceId: string): Promise<import("../../infrastructure/course.schema").CourseDocument>;
    updateResourcesOrder(courseId: string, resourcesOrder: {
        id: string;
        order: number;
    }[]): Promise<import("../../infrastructure/course.schema").CourseDocument>;
    private formatCourseResponse;
}
