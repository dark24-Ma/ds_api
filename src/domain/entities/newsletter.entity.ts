export class Newsletter {
  constructor(
    public id: string,
    public email: string,
    public isSubscribed: boolean,
    public subscribedAt: Date,
    public unsubscribedAt?: Date,
  ) {}
}
