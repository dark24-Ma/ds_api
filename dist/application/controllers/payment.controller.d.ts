import { SubscriptionPaymentService, SubscriptionUpgradeRequest } from '../services/subscription-payment.service';
export declare class PaymentController {
    private readonly subscriptionPaymentService;
    constructor(subscriptionPaymentService: SubscriptionPaymentService);
    initiateUpgradePayment(request: SubscriptionUpgradeRequest): Promise<import("../services/subscription-payment.service").PaymentPendingResponse>;
    initiateNewSubscriptionPayment(request: SubscriptionUpgradeRequest): Promise<import("../services/subscription-payment.service").PaymentPendingResponse>;
    handlePaymentConfirmation(confirmationData: any): Promise<{
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
        details: import("../services/paygate.service").PayGateStatusResponse;
    }>;
}
