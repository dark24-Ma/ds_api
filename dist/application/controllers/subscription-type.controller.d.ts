import { SubscriptionTypeService } from '../services/subscription-type.service';
export declare class SubscriptionTypeController {
    private readonly subscriptionTypeService;
    constructor(subscriptionTypeService: SubscriptionTypeService);
    createSubscriptionType(subscriptionTypeData: any): Promise<{
        id: any;
        name: any;
        description: any;
        price: any;
        duration: any;
        features: any;
        createdAt: any;
        updatedAt: any;
    }>;
    getAllSubscriptionTypes(): Promise<{
        id: any;
        name: any;
        description: any;
        price: any;
        duration: any;
        features: any;
        createdAt: any;
        updatedAt: any;
    }[]>;
    getSubscriptionTypeById(id: string): Promise<{
        id: any;
        name: any;
        description: any;
        price: any;
        duration: any;
        features: any;
        createdAt: any;
        updatedAt: any;
    }>;
    updateSubscriptionType(id: string, updateData: any): Promise<{
        id: any;
        name: any;
        description: any;
        price: any;
        duration: any;
        features: any;
        createdAt: any;
        updatedAt: any;
    }>;
    deleteSubscriptionType(id: string): Promise<{
        message: string;
    }>;
}
