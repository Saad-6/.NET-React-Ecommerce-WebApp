export default interface ProductModel {
  id?: number;
  price: number;
  stock?: number;
  name: string;
  description: string;
  category: string;
  image?: string;
  gimmickPrice?:number;
}