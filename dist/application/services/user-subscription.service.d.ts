import { UserSubscriptionRepository } from '../../infrastructure/repository/user-subscription.repository';
import { SubscriptionTypeService } from './subscription-type.service';
export declare class UserSubscriptionService {
    private userSubscriptionRepository;
    private subscriptionTypeService;
    constructor(userSubscriptionRepository: UserSubscriptionRepository, subscriptionTypeService: SubscriptionTypeService);
    subscribeUser(userId: string, subscriptionTypeId: string): Promise<{
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
    private formatUserSubscriptionResponse;
}
