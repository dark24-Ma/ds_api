export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    firstname: string;
    resetToken?: string;
    resetTokenExpiration?: number;
    userType?: string;
    phonenumber?: string;
    constructor(id: string, name: string, email: string, password: string, firstname: string, resetToken?: string, resetTokenExpiration?: number, userType?: string, phonenumber?: string);
}
