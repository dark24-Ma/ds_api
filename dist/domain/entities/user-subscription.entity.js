"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscription = void 0;
class UserSubscription {
    constructor(id, userId, subscriptionTypeId, startDate, endDate, isActive, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.subscriptionTypeId = subscriptionTypeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.UserSubscription = UserSubscription;
//# sourceMappingURL=user-subscription.entity.js.map