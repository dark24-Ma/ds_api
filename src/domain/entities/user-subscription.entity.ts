export class UserSubscription {
  constructor(
    public id: string,
    public userId: string,
    public subscriptionTypeId: string,
    public startDate: Date,
    public endDate: Date,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
