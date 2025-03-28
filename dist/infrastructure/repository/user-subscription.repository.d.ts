import { Model } from 'mongoose';
import { UserSubscriptionDocument } from '../user-subscription.schema';
export declare class UserSubscriptionRepository {
    private userSubscriptionModel;
    constructor(userSubscriptionModel: Model<UserSubscriptionDocument>);
    create(userSubscriptionData: any): Promise<UserSubscriptionDocument>;
    findByUserId(userId: string): Promise<UserSubscriptionDocument | null>;
    update(userId: string, updateData: any): Promise<UserSubscriptionDocument | null>;
    delete(userId: string): Promise<UserSubscriptionDocument | null>;
    getActiveSubscriptions(): Promise<UserSubscriptionDocument[]>;
    findAll(): Promise<UserSubscriptionDocument[]>;
    findWithPagination(page?: number, limit?: number): Promise<UserSubscriptionDocument[]>;
    count(): Promise<number>;
}
