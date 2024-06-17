export class OrderDto {
  constructor(
    public id: number,
    public email: string,
    public productName: string,
    public quantity: number,
  ) {}
}
