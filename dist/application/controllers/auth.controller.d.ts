import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        name: string;
        email: string;
        password: string;
        firstname: string;
        userType: string;
    }): Promise<import("../../domain/entities/user.entity").User>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    resetPassword(body: {
        resetToken: string;
        password: string;
    }): Promise<void>;
    requestResetPawwaord(body: {
        email: string;
    }): Promise<void>;
}
