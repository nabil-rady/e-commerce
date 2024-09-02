import { Cart } from "../types/Cart.ts";

export default function countProductsInCart(cart: Cart): number {
  let ans = 0;
  for (const productId in cart) {
    for (const { quantity } of cart[productId]) ans += quantity;
  }
  return ans;
}
