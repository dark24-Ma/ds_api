import { ConfigService } from '@nestjs/config';
export interface PayGatePaymentRequest {
    amount: number;
    description: string;
    identifier: string;
    userId: string;
    subscriptionTypeId: string;
    phone?: string;
    network?: 'FLOOZ' | 'TMONEY';
}
export interface PayGatePaymentResponse {
    tx_reference: string;
    status: number;
}
export interface PayGateStatusResponse {
    tx_reference: string;
    identifier: string;
    payment_reference?: string;
    status: number;
    datetime?: string;
    payment_method?: 'FLOOZ' | 'TMONEY';
    amount?: number;
    phone_number?: string;
}
export declare class PayGateService {
    private configService;
    private readonly logger;
    private readonly authToken;
    private readonly baseUrl;
    constructor(configService: ConfigService);
    generatePaymentUrl(paymentRequest: PayGatePaymentRequest): string;
    initiatePayment(paymentRequest: PayGatePaymentRequest): Promise<PayGatePaymentResponse>;
    checkPaymentStatus(txReference: string): Promise<PayGateStatusResponse>;
    checkPaymentStatusByIdentifier(identifier: string): Promise<PayGateStatusResponse>;
    generateTransactionIdentifier(userId: string, subscriptionTypeId: string): string;
    parseTransactionIdentifier(identifier: string): {
        userId: string;
        subscriptionTypeId: string;
        timestamp: number;
    } | null;
    interpretPaymentStatus(status: number): string;
}
