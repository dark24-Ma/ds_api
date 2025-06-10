import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface PayGatePaymentRequest {
  amount: number;
  description: string;
  identifier: string; // ID unique de la transaction
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

@Injectable()
export class PayGateService {
  private readonly logger = new Logger(PayGateService.name);
  private readonly authToken = '879cd584-1383-4029-953a-82f528d83714';
  private readonly baseUrl = 'https://paygateglobal.com';

  constructor(private configService: ConfigService) {}

  /**
   * Générer l'URL de redirection PayGate pour un paiement d'abonnement
   */
  generatePaymentUrl(paymentRequest: PayGatePaymentRequest): string {
    const baseUrl = `${this.baseUrl}/v1/page`;
    const returnUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000') + '/payment/success';
    
    const params = new URLSearchParams({
      token: this.authToken,
      amount: paymentRequest.amount.toString(),
      description: paymentRequest.description,
      identifier: paymentRequest.identifier,
      url: returnUrl, // URL de retour après paiement
    });

    // Ajouter les paramètres optionnels s'ils sont fournis
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

  /**
   * Initier un paiement avec l'API PayGate (Méthode 1 - alternative)
   */
  async initiatePayment(paymentRequest: PayGatePaymentRequest): Promise<PayGatePaymentResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/v1/pay`, {
        auth_token: this.authToken,
        phone_number: paymentRequest.phone,
        amount: paymentRequest.amount,
        description: paymentRequest.description,
        identifier: paymentRequest.identifier,
        network: paymentRequest.network || 'FLOOZ'
      });

      this.logger.log(`Paiement initié pour l'identifier ${paymentRequest.identifier}:`, response.data);
      
      return response.data;
    } catch (error) {
      this.logger.error(`Erreur lors de l'initiation du paiement:`, error.response?.data || error.message);
      throw new Error('Erreur lors de l\'initiation du paiement');
    }
  }

  /**
   * Vérifier le statut d'un paiement
   */
  async checkPaymentStatus(txReference: string): Promise<PayGateStatusResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/v1/status`, {
        auth_token: this.authToken,
        tx_reference: txReference
      });

      this.logger.log(`Statut du paiement ${txReference}:`, response.data);
      
      return response.data;
    } catch (error) {
      this.logger.error(`Erreur lors de la vérification du statut:`, error.response?.data || error.message);
      throw new Error('Erreur lors de la vérification du statut');
    }
  }

  /**
   * Vérifier le statut d'un paiement par identifier
   */
  async checkPaymentStatusByIdentifier(identifier: string): Promise<PayGateStatusResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/v2/status`, {
        auth_token: this.authToken,
        identifier: identifier
      });

      this.logger.log(`Statut du paiement (identifier: ${identifier}):`, response.data);
      
      return response.data;
    } catch (error) {
      this.logger.error(`Erreur lors de la vérification du statut par identifier:`, error.response?.data || error.message);
      throw new Error('Erreur lors de la vérification du statut');
    }
  }

  /**
   * Générer un identifiant unique pour une transaction
   */
  generateTransactionIdentifier(userId: string, subscriptionTypeId: string): string {
    const timestamp = Date.now();
    return `SUB_${userId}_${subscriptionTypeId}_${timestamp}`;
  }

  /**
   * Parser l'identifier pour extraire les informations
   */
  parseTransactionIdentifier(identifier: string): { userId: string; subscriptionTypeId: string; timestamp: number } | null {
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

  /**
   * Interpréter le statut PayGate
   */
  interpretPaymentStatus(status: number): string {
    switch (status) {
      case 0: return 'success'; // Paiement réussi
      case 2: return 'pending'; // En cours
      case 4: return 'expired'; // Expiré
      case 6: return 'cancelled'; // Annulé
      default: return 'unknown';
    }
  }
} 