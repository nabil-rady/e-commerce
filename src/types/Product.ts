import { AttributeSet } from "./Attribute";

export interface Product {
  id: string;
  name: string;
  description: string;
  inStock: boolean;
  prices: Price[];
  brand: string;
  gallery: string[];
  attributes: AttributeSet[];
}

export interface Price {
  amount: string;
  currency: Currency;
}

export interface Currency {
  symbol: string;
  label: string;
}
