export declare class Newsletter {
    id: string;
    email: string;
    isSubscribed: boolean;
    subscribedAt: Date;
    unsubscribedAt?: Date;
    constructor(id: string, email: string, isSubscribed: boolean, subscribedAt: Date, unsubscribedAt?: Date);
}
