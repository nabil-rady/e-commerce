import { Product } from "../types/Product";

type ProductWithQuantity = Product & {
  quantity: number;
};

export type Cart = ProductWithQuantity[];
