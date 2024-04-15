import CartItemModel from "./CartItemModel";

export default interface CartModel {
    id: number;
    userId: string;
    cartItems: CartItemModel[];
    cartTotal:string;
    stripePaymentIntentId:any
  }