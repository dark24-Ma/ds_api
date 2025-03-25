export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    firstname: string;
    resetToken?: string;
    resetTokenExpiration?: number;
    constructor(id: string, name: string, email: string, password: string, firstname: string, resetToken?: string, resetTokenExpiration?: number);
}
