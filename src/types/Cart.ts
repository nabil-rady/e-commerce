import { Product } from "../types/Product";
import { Attribute } from "./Attribute";

export type Cart = Record<
  string,
  {
    product: Product;
    quantity: number;
    selectedAttributes: Attribute[];
  }[]
>;
