import React from "react";
import countProductsInCart from "../utils/countProductsInCart.ts";
import { Cart } from "../types/Cart.ts";
import AttributesComponent from "./Attributes.tsx";
import { Product } from "../types/Product.ts";
import totalPriceInCart from "../utils/totalPriceInCart.ts";

interface CartOverlayProps {
  cart: Cart;
  open?: boolean;
  closeOverlay: () => void;
  incQuantity: (product: Product, index: number) => void;
  decQuantity: (product: Product, index: number) => void;
}

class CartOverlay extends React.Component<CartOverlayProps> {
  render(): React.ReactNode {
    const count = countProductsInCart(this.props.cart);
    return (
      <div
        style={{
          visibility: this.props.open ? "visible" : "hidden",
        }}
        onClick={() => {
          this.props.closeOverlay();
        }}
        className="absolute z-50 backdrop-blur-sm invisible left-0 right-0 bottom-0 top-[50px] bg-[rgba(57,55,72,0.22)]"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute min-w-[370px] max-h-[calc(90vh-50px)] overflow-y-scroll right-[8%] bg-white px-5 py-6"
        >
          <h2 className="font-bold">
            {count === 1 ? "1 Item" : `${count} Items`}
          </h2>
          {Object.values(this.props.cart).map((el) =>
            el.map(({ product, quantity, selectedAttributes }, index) => (
              <div
                key={product.id + index.toString()}
                className="flex gap-5 my-6 min-h-[200px] relative"
              >
                <div className="w-1/3">
                  <h3 className="font-light">{product.name}</h3>
                  <p className="font-normal">${product.price}</p>
                  <AttributesComponent
                    overlay
                    attributeSets={product.attributes}
                    selectedAttributes={selectedAttributes}
                    setAttribute={() => {}}
                  />
                </div>
                <div className="flex my-2 justify-self-center flex-col justify-center text-center">
                  <button
                    onClick={() => {
                      this.props.incQuantity(product, index);
                    }}
                    data-testid="cart-item-amount-increase"
                    className="w-7 h-7 text-2xl font-semibold flex mb-auto justify-center items-center border-2 border-black transition-colors hover:bg-darkGray hover:text-white"
                  >
                    +
                  </button>
                  <div data-testid="cart-item-amount">{quantity}</div>
                  <button
                    onClick={() => {
                      this.props.decQuantity(product, index);
                    }}
                    data-testid="cart-item-amount-decrease"
                    className="w-7 h-7 text-2xl font-semibold mt-auto flex justify-center items-center border-2 border-black transition-colors hover:bg-darkGray hover:text-white"
                  >
                    -
                  </button>
                </div>
                <div className="w-1/3 absolute right-0 h-full max-h-[170px]">
                  <img
                    className="h-full brightness-95"
                    src={product.gallery[0]}
                    alt="product thubmnail"
                  />
                </div>
              </div>
            ))
          )}
          <div className="flex my-4">
            <h3 className="font-medium">Total</h3>
            <p className="ml-auto font-bold" data-testid="cart-total">
              ${totalPriceInCart(this.props.cart)}
            </p>
          </div>
          <button
            disabled={countProductsInCart(this.props.cart) === 0}
            className="my-4 w-full py-4 px-8 font-semibold uppercase text-white bg-primary disabled:opacity-50 disabled:cursor-default"
          >
            Place order
          </button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
