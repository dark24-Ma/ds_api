"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, password, firstname, resetToken, resetTokenExpiration, userType, phonenumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.resetToken = resetToken;
        this.resetTokenExpiration = resetTokenExpiration;
        this.userType = userType;
        this.phonenumber = phonenumber;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map