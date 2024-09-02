import React from "react";
import parse from "html-react-parser";
import AttributesComponent from "./Attributes.tsx";

import { Product } from "../types/Product";
import { Attribute } from "../types/Attribute.ts";

interface ProductDetailsProps {
  product: Product;
  addToCart: (product: Product, selectedAttributes?: Attribute[]) => void;
}

interface ProductDetailsState {
  selectedAttributes: Attribute[];
}

class ProductDetails extends React.Component<
  ProductDetailsProps,
  ProductDetailsState
> {
  state = {
    selectedAttributes: this.props.product.attributes.map(
      (attributeSet) => attributeSet.items[0]
    ),
  };

  setAttribute = (attribute: Attribute, index: number) => {
    this.setState((prevState) => {
      const newSelectedAttributes = [...prevState.selectedAttributes];
      newSelectedAttributes.splice(index, 1, attribute);

      return {
        ...prevState,
        selectedAttributes: newSelectedAttributes,
      };
    });
  };

  render() {
    return (
      <div className="basis-2/5 my-16 lg:my-0 lg:ml-auto">
        <h1 className="text-3xl font-semibold">{this.props.product.name}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // const selectedAttributes: Attribute[] = [];
            // for (const attribtueSet of this.props.product.attributes) {
            //   const el = document.querySelector(
            //     `input[name="${toKebabCase(attribtueSet.id)}"]:checked`
            //   ) as HTMLInputElement | null;
            //   if (!el) {
            //     throw Error("Improper form names");
            //   }
            //   selectedAttributes.push({
            //     id: el.dataset.id as string,
            //     value: el.value,
            //     displayValue: el.dataset.displayvalue as string,
            //   });
            // }
            this.props.addToCart(
              this.props.product,
              this.state.selectedAttributes
            );
          }}
        >
          <AttributesComponent
            attributeSets={this.props.product.attributes}
            selectedAttributes={this.state.selectedAttributes}
            setAttribute={this.setAttribute}
          />
          <div className="font-bold">
            <h2 className="text-lg">Price:</h2>
            <p className="text-2xl">${this.props.product.price}</p>
          </div>
          <button
            type="submit"
            data-testid="add-to-cart"
            className="my-4 w-full py-4 px-8 font-semibold text-white bg-primary"
          >
            Add to cart
          </button>
          <div data-testid="product-description" className="description">
            {parse(this.props.product.description)}
          </div>
        </form>
      </div>
    );
  }
}

export default ProductDetails;
