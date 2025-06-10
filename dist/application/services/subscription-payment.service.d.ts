import { PayGateService } from './paygate.service';
import { UserSubscriptionService } from './user-subscription.service';
import { SubscriptionTypeService } from './subscription-type.service';
export interface SubscriptionUpgradeRequest {
    userId: string;
    newSubscriptionTypeId: string;
    phone?: string;
    network?: 'FLOOZ' | 'TMONEY';
}
export interface PaymentPendingResponse {
    paymentUrl: string;
    identifier: string;
    amount: number;
    description: string;
}
export declare class SubscriptionPaymentService {
    private payGateService;
    private userSubscriptionService;
    private subscriptionTypeService;
    private readonly logger;
    constructor(payGateService: PayGateService, userSubscriptionService: UserSubscriptionService, subscriptionTypeService: SubscriptionTypeService);
    initiateUpgradePayment(request: SubscriptionUpgradeRequest): Promise<PaymentPendingResponse>;
    initiateNewSubscriptionPayment(request: SubscriptionUpgradeRequest): Promise<PaymentPendingResponse>;
    processPaymentConfirmation(confirmationData: any): Promise<{
        success: boolean;
        message: string;
        subscription: {
            id: any;
            userId: any;
            subscriptionTypeId: any;
            startDate: any;
            endDate: any;
            isActive: any;
            createdAt: any;
            updatedAt: any;
        };
        paymentDetails: {
            tx_reference: any;
            payment_reference: any;
            amount: any;
            payment_method: any;
            phone_number: any;
        };
        status?: undefined;
    } | {
        success: boolean;
        message: string;
        status: string;
        subscription?: undefined;
        paymentDetails?: undefined;
    }>;
    checkPaymentStatus(identifier: string): Promise<{
        identifier: string;
        status: string;
        details: import("./paygate.service").PayGateStatusResponse;
    }>;
}
