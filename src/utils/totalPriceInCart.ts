import { Cart } from "../types/Cart.ts";

export default function totalPriceInCart(cart: Cart): string {
  let totalPrice = 0;
  let currencySymbol = "";
  for (const productId in cart) {
    for (const { product, quantity } of cart[productId]) {
      totalPrice += product.prices[0].amount * quantity;
      currencySymbol = product.prices[0].currency.symbol;
    }
  }

  return `${currencySymbol}${totalPrice}`;
}
