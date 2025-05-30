import { SubscriptionTypeRepository } from '../../infrastructure/repository/subscription-type.repository';
export declare class SubscriptionTypeService {
    private subscriptionTypeRepository;
    constructor(subscriptionTypeRepository: SubscriptionTypeRepository);
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
        id: any;
        name: any;
        description: any;
        price: any;
        duration: any;
        features: any;
        createdAt: any;
        updatedAt: any;
    }>;
    private formatSubscriptionTypeResponse;
}
