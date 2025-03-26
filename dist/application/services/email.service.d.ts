export declare class EmailService {
    private transporter;
    constructor();
    sendWelcomeEmail(to: string, name: string): Promise<void>;
    sendPasswordResetEmail(to: string, resetLink: string): Promise<void>;
    sendNewsletterWelcome(to: string): Promise<void>;
}
