import React from "react";
import parse from "html-react-parser";
import AttributesComponent from "./Attributes.tsx";

import { Product } from "../types/Product";
import AddToCart from "./AddToCart.tsx";

interface ProductDetailsProps {
  product: Product;
}

class ProductDetails extends React.Component<ProductDetailsProps> {
  render() {
    return (
      <div className="basis-2/5 my-16 lg:my-0 lg:ml-auto">
        <h1 className="text-3xl font-semibold">{this.props.product.name}</h1>
        <AttributesComponent attributeSets={this.props.product.attributes} />
        <div className="font-bold">
          <h2 className="text-lg">Price:</h2>
          <p className="text-2xl">${this.props.product.price}</p>
        </div>
        <AddToCart />
        <div data-testid="product-description" className="description">
          {parse(this.props.product.description)}
        </div>
      </div>
    );
  }
}

export default ProductDetails;
