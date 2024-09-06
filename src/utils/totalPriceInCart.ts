import { Cart } from "../types/Cart.ts";
import Decimal from "decimal.js";

export default function totalPriceInCart(cart: Cart): string {
  let totalPrice = new Decimal(0);
  let currencySymbol = "";
  for (const productId in cart) {
    for (const { product, quantity } of cart[productId]) {
      totalPrice = totalPrice.add(
        new Decimal(product.prices[0].amount).mul(quantity)
      );
      currencySymbol = product.prices[0].currency.symbol;
    }
  }

  return `${currencySymbol}${totalPrice}`;
}
