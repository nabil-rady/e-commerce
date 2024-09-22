import React from "react";
import gql from "graphql-tag";
import { ApolloClient } from "@apollo/client";
import { toast } from "react-toastify";

import Loading from "./Loading.tsx";
import AttributesComponent from "./Attributes.tsx";
import ApolloClientContext from "../ApolloClientContext.tsx";

import countProductsInCart from "../utils/countProductsInCart.ts";
import totalPriceInCart from "../utils/totalPriceInCart.ts";

import { Cart } from "../types/Cart.ts";
import { Product } from "../types/Product.ts";

function createOrderMutation(cart: Cart) {
  const productIds: string[] = [];
  const quantities: number[] = [];
  const selectedAttributes: number[][] = [];
  for (const productId in cart) {
    for (let i = 0; i < cart[productId].length; i++) {
      productIds.push(productId);
      quantities.push(cart[productId][i].quantity);
      selectedAttributes.push(
        cart[productId][i].selectedAttributes.map(
          (selectedAttribute) => selectedAttribute._id
        )
      );
    }
  }

  return gql`
    mutation Mutation {
      createOrder(
        productIds: ${JSON.stringify(productIds)},
        quantities: ${JSON.stringify(quantities)},
        selectedAttributesIds: ${JSON.stringify(selectedAttributes)}
      ) {
        id
      }
    }`;
}

interface CartOverlayProps {
  cart: Cart;
  open?: boolean;
  emptyCart: () => void;
  closeOverlay: () => void;
  incQuantity: (product: Product, index: number) => void;
  decQuantity: (product: Product, index: number) => void;
}

interface CartOverlayState {
  loading: boolean;
  error: Error | null;
}

class CartOverlay extends React.Component<CartOverlayProps, CartOverlayState> {
  static contextType = ApolloClientContext;
  context!: ApolloClient<object>;

  state = {
    loading: false,
    error: null,
  };

  async createOrder() {
    const client = this.context;
    this.setState({ loading: true, error: null });

    try {
      console.log(createOrderMutation(this.props.cart));
      await client.mutate({
        mutation: createOrderMutation(this.props.cart),
      });
      this.props.emptyCart();
      toast("Order placed successfuly");
    } catch (error) {
      this.setState({ error: error as Error, loading: false });
      console.error(error);
      toast.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

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
        data-testid="cart-overlay"
        className="absolute z-50 invisible left-0 right-0 bottom-0 top-[50px] bg-[rgba(57,55,72,0.22)]"
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
                  <p className="font-normal">
                    {product.prices[0].currency.symbol}
                    {product.prices[0].amount}
                  </p>
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
              {totalPriceInCart(this.props.cart)}
            </p>
          </div>
          <button
            disabled={
              countProductsInCart(this.props.cart) === 0 || this.state.loading
            }
            onClick={() => {
              this.createOrder();
            }}
            className="my-4 w-full py-4 px-8 font-semibold uppercase text-white bg-primary transition-transform enabled:hover:scale-105 disabled:opacity-50 disabled:cursor-default flex justify-center"
          >
            {this.state.loading && <Loading />} Place order
          </button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
