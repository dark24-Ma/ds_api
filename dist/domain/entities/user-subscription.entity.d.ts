export declare class UserSubscription {
    id: string;
    userId: string;
    subscriptionTypeId: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(id: string, userId: string, subscriptionTypeId: string, startDate: Date, endDate: Date, isActive: boolean, createdAt: Date, updatedAt: Date);
}
