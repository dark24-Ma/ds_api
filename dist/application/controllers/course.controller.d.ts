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
        isFreeAccess: any;
        downloadCount: any;
        createdAt: any;
        updatedAt: any;
        createdBy: any;
        resources: any;
    }[]>;
    getCoursesForUser(req: any): Promise<{
        courses: any[];
        userSubscription: {
            subscriptionType: any;
            subscriptionTypeId: any;
            isActive: any;
            endDate: any;
        };
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
    downloadCourse(id: string, req: any): Promise<{
        url: string;
        title: string;
        type: import("../../infrastructure/course.schema").ResourceType;
    }>;
    viewCourse(id: string, resourceId: string, req: any, res: any): Promise<any>;
    addResourceToCourse(id: string, resourceData: any, files: {
        file?: UploadedFile[];
    }): Promise<import("../../infrastructure/course.schema").CourseDocument>;
    removeResourceFromCourse(courseId: string, resourceId: string): Promise<import("../../infrastructure/course.schema").CourseDocument>;
    updateResourcesOrder(id: string, orderData: {
        resources: {
            id: string;
            order: number;
        }[];
    }): Promise<import("../../infrastructure/course.schema").CourseDocument>;
}
