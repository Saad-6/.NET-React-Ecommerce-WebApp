import CartItemModel from "./CartItemModel";

export default interface Order {
    id: number;
    userId: string;
    userAddress: string;
    status: string;
    cartItems: CartItemModel[];
    total:string;
    dateTime:string;
  }