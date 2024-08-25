import React from "react";

import type { Product } from "../types/Product";

interface ProductComponentProps {
  index: number;
  product: Product;
}

function getClassName(product: Product, index: number): string {
  let className =
    "box-border my-5 mx-auto md:mx-0 md:my-0 w-fit cursor-pointer group lg:justify-self-start";
  if (index % 2 === 1) {
    className += " md:justify-self-end";
  }
  if (index % 3 === 2) {
    className += " lg:justify-self-end";
  }
  if (index % 3 === 1) {
    className += " lg:justify-self-center";
  }
  return className;
}

function addOutofStock(product: Product): string {
  if (!product.inStock)
    return " relative cursor-default after:content-['Out_of_Stock'] text-2xl after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:z-10 after:text-xl after:uppercase after:text-light before:hover:invisible";
  return "";
}

function addGreyOutEffect(product: Product): string {
  if (!product.inStock) return " opacity-25";
  return "";
}

class ProductComponent extends React.Component<ProductComponentProps> {
  render(): React.ReactNode {
    return (
      <div
        className={getClassName(this.props.product, this.props.index)}
        data-testid={this.props.product.id}
      >
        <div
          className={
            "w-[300px] h-[300px] my-3 relative" +
            addOutofStock(this.props.product)
          }
        >
          {this.props.product.inStock && (
            <button className="w-12 h-12 rounded-full absolute z-10 bg-primary bottom-0 right-5 translate-y-1/2 flex justify-center items-center invisible group-hover:visible hover:scale-110 transition-transform">
              <img src="/cart-white.svg" alt="cart" />
            </button>
          )}
          <img
            className={
              "w-full h-full brightness-95" +
              addGreyOutEffect(this.props.product)
            }
            src={this.props.product.gallery[0]}
            alt="Product thubmnail"
          />
        </div>
        <h2 className="font-light text-lg">{this.props.product.name}</h2>
        <p className="text-lg">${this.props.product.price}</p>
      </div>
    );
  }
}

export default ProductComponent;
