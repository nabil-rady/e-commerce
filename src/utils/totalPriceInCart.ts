import { Cart } from "../types/Cart.ts";

export default function totalPriceInCart(cart: Cart): number {
  let ans = 0;
  for (const productId in cart) {
    for (const { product, quantity } of cart[productId])
      ans += product.price * quantity;
  }
  return ans;
}
