import { AttributeSet } from "./Attribute";

export interface Product {
  id: string;
  name: string;
  description: string;
  inStock: boolean;
  price: number;
  brand: string;
  gallery: string[];
  attributes: AttributeSet[];
}
