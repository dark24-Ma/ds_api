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
    getSubscriptionSuggestions(userId: string, requestedSubscriptionTypeId: string): Promise<{
        currentSubscription: {
            id: string;
            type: {
                id: any;
                name: any;
                description: any;
                price: any;
                duration: any;
                level: any;
                features: any;
                createdAt: any;
                updatedAt: any;
            };
            endDate: Date;
        };
        suggestions: {
            type: string;
            title: string;
            description: string;
            subscriptionType: {
                id: any;
                name: any;
                description: any;
                price: any;
                duration: any;
                level: any;
                features: any;
                createdAt: any;
                updatedAt: any;
            };
            newEndDate: Date;
        }[];
    }>;
    private addDaysToDate;
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
    getUserSubscriptionWithDetails(userId: string): Promise<{
        id: string;
        userId: string;
        subscriptionTypeId: string;
        startDate: Date;
        endDate: Date;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        subscriptionType: any;
        status: string;
    }>;
    private calculateSubscriptionStatus;
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
    hasActiveSubscription(userId: string): Promise<boolean>;
    expireSubscription(subscriptionId: string): Promise<{
        id: any;
        userId: any;
        subscriptionTypeId: any;
        startDate: any;
        endDate: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    cancelSubscription(subscriptionId: string): Promise<{
        id: any;
        userId: any;
        subscriptionTypeId: any;
        startDate: any;
        endDate: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    checkAndUpdateExpiredSubscriptions(): Promise<{
        expiredCount: number;
        expiredSubscriptions: any[];
    }>;
    renewSubscription(userId: string, subscriptionTypeId: string): Promise<{
        id: any;
        userId: any;
        subscriptionTypeId: any;
        startDate: any;
        endDate: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    extendSubscription(userId: string, additionalDays?: number): Promise<{
        id: any;
        userId: any;
        subscriptionTypeId: any;
        startDate: any;
        endDate: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    upgradeSubscription(userId: string, newSubscriptionTypeId: string): Promise<{
        id: any;
        userId: any;
        subscriptionTypeId: any;
        startDate: any;
        endDate: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    getUserSubscriptionHistory(userId: string): Promise<{
        id: string;
        userId: string;
        subscriptionTypeId: string;
        startDate: Date;
        endDate: Date;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        subscriptionType: any;
        status: string;
    }[]>;
}
