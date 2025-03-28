import { UserSubscriptionService } from '../services/user-subscription.service';
export declare class UserSubscriptionController {
    private readonly userSubscriptionService;
    constructor(userSubscriptionService: UserSubscriptionService);
    subscribeUser(body: {
        userId: string;
        subscriptionTypeId: string;
    }): Promise<{
        id: any;
        userId: any;
        subscriptionTypeId: any;
        startDate: any;
        endDate: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    getUserSubscription(userId: string): Promise<{
        id: any;
        userId: any;
        subscriptionTypeId: any;
        startDate: any;
        endDate: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    getAllSubscriptions(): Promise<{
        id: string;
        userId: string;
        subscriptionTypeId: string;
        startDate: Date;
        endDate: Date;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        subscriptionType: any;
    }[]>;
}
