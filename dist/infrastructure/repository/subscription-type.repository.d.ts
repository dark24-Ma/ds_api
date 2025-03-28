import { Model } from 'mongoose';
import { SubscriptionTypeDocument } from '../subscription-type.schema';
export declare class SubscriptionTypeRepository {
    private subscriptionTypeModel;
    constructor(subscriptionTypeModel: Model<SubscriptionTypeDocument>);
    create(subscriptionTypeData: any): Promise<SubscriptionTypeDocument>;
    findById(id: string): Promise<SubscriptionTypeDocument | null>;
    findAll(): Promise<SubscriptionTypeDocument[]>;
    update(id: string, updateData: any): Promise<SubscriptionTypeDocument | null>;
    delete(id: string): Promise<SubscriptionTypeDocument | null>;
}
