import { UserSubscriptionService } from './user-subscription.service';
export declare class SubscriptionExpiryService {
    private readonly userSubscriptionService;
    private readonly logger;
    constructor(userSubscriptionService: UserSubscriptionService);
    handleExpiredSubscriptions(): Promise<{
        expiredCount: number;
        expiredSubscriptions: any[];
    }>;
    forceCheckExpiredSubscriptions(): Promise<{
        expiredCount: number;
        expiredSubscriptions: any[];
    }>;
}
