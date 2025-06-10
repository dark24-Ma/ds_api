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
    checkUserSubscription(userId: string): Promise<{
        hasActiveSubscription: boolean;
        error?: undefined;
    } | {
        hasActiveSubscription: boolean;
        error: any;
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
    checkAndUpdateExpiredSubscriptions(): Promise<{
        expiredCount: number;
        expiredSubscriptions: any[];
    }>;
    renewSubscription(body: {
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
    extendSubscription(body: {
        userId: string;
        additionalDays?: number;
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
    upgradeSubscription(body: {
        userId: string;
        newSubscriptionTypeId: string;
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
    getSubscriptionSuggestions(userId: string, requestedTypeId: string): Promise<{
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
