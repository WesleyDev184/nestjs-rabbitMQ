export class OrderDto {
  public id?: number;
  public email: string;
  public productName: string;
  public quantity: number;

  constructor(email: string, productName: string, quantity: number) {
    this.email = email;
    this.productName = productName;
    this.quantity = quantity;
  }
}
