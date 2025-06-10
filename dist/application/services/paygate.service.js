"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PayGateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayGateService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let PayGateService = PayGateService_1 = class PayGateService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(PayGateService_1.name);
        this.authToken = '879cd584-1383-4029-953a-82f528d83714';
        this.baseUrl = 'https://paygateglobal.com';
    }
    generatePaymentUrl(paymentRequest) {
        const baseUrl = `${this.baseUrl}/v1/page`;
        const returnUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000') + '/payment/success';
        const params = new URLSearchParams({
            token: this.authToken,
            amount: paymentRequest.amount.toString(),
            description: paymentRequest.description,
            identifier: paymentRequest.identifier,
            url: returnUrl,
        });
        if (paymentRequest.phone) {
            params.append('phone', paymentRequest.phone);
        }
        if (paymentRequest.network) {
            params.append('network', paymentRequest.network);
        }
        const paymentUrl = `${baseUrl}?${params.toString()}`;
        this.logger.log(`URL de paiement générée pour l'identifier ${paymentRequest.identifier}: ${paymentUrl}`);
        return paymentUrl;
    }
    async initiatePayment(paymentRequest) {
        try {
            const response = await axios_1.default.post(`${this.baseUrl}/api/v1/pay`, {
                auth_token: this.authToken,
                phone_number: paymentRequest.phone,
                amount: paymentRequest.amount,
                description: paymentRequest.description,
                identifier: paymentRequest.identifier,
                network: paymentRequest.network || 'FLOOZ'
            });
            this.logger.log(`Paiement initié pour l'identifier ${paymentRequest.identifier}:`, response.data);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'initiation du paiement:`, error.response?.data || error.message);
            throw new Error('Erreur lors de l\'initiation du paiement');
        }
    }
    async checkPaymentStatus(txReference) {
        try {
            const response = await axios_1.default.post(`${this.baseUrl}/api/v1/status`, {
                auth_token: this.authToken,
                tx_reference: txReference
            });
            this.logger.log(`Statut du paiement ${txReference}:`, response.data);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Erreur lors de la vérification du statut:`, error.response?.data || error.message);
            throw new Error('Erreur lors de la vérification du statut');
        }
    }
    async checkPaymentStatusByIdentifier(identifier) {
        try {
            const response = await axios_1.default.post(`${this.baseUrl}/api/v2/status`, {
                auth_token: this.authToken,
                identifier: identifier
            });
            this.logger.log(`Statut du paiement (identifier: ${identifier}):`, response.data);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Erreur lors de la vérification du statut par identifier:`, error.response?.data || error.message);
            throw new Error('Erreur lors de la vérification du statut');
        }
    }
    generateTransactionIdentifier(userId, subscriptionTypeId) {
        const timestamp = Date.now();
        return `SUB_${userId}_${subscriptionTypeId}_${timestamp}`;
    }
    parseTransactionIdentifier(identifier) {
        const match = identifier.match(/^SUB_(.+)_(.+)_(\d+)$/);
        if (!match) {
            return null;
        }
        return {
            userId: match[1],
            subscriptionTypeId: match[2],
            timestamp: parseInt(match[3])
        };
    }
    interpretPaymentStatus(status) {
        switch (status) {
            case 0: return 'success';
            case 2: return 'pending';
            case 4: return 'expired';
            case 6: return 'cancelled';
            default: return 'unknown';
        }
    }
};
exports.PayGateService = PayGateService;
exports.PayGateService = PayGateService = PayGateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PayGateService);
//# sourceMappingURL=paygate.service.js.map