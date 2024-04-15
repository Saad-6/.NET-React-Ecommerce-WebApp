import ProductModel from "./ProductModel";

export default interface CartItemModel {
    id: number;
    cartId: number;
    menuItemId: number;
    menuItem: ProductModel;
    quantity: number;
  }