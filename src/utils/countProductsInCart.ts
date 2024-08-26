import { Cart } from "../types/Cart.ts";

export default function countProductsInCart(cart: Cart): number {
  let ans = 0;
  for (const product of cart) {
    ans += product.quantity;
  }
  return ans;
}
