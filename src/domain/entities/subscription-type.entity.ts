// src/domain/entities/subscription-type.entity.ts
export class SubscriptionType {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public duration: number, // Durée en jours
    public features: string[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
