export declare class SubscriptionType {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
    constructor(id: string, name: string, description: string, price: number, duration: number, features: string[], createdAt: Date, updatedAt: Date);
}
