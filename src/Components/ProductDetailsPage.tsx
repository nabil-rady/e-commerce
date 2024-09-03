import React from "react";
import gql from "graphql-tag";
import { ApolloClient } from "@apollo/client";
import { withRouter, RouteComponentProps } from "react-router-dom";

import ApolloClientContext from "../ApolloClientContext.tsx";
import { Product } from "../types/Product.ts";
import { Attribute } from "../types/Attribute.ts";
import Carousel from "./Carousel.tsx";
import ProductDetails from "./ProductDetails.tsx";

interface ProductDetailsPageProps
  extends RouteComponentProps<
    { productId: string },
    {},
    {
      product?: Product;
    }
  > {
  addToCart: (product: Product, selectedAttributes?: Attribute[]) => void;
}

interface ProductDetailsPageState {
  product: Product | null;
  loading: boolean;
  error: Error | null;
}

function getProductQuery(productId: string) {
  return gql`
      query Query {
          product(id: "${productId}") {
              id
              name
              gallery
              description
              inStock
              price
              brand
              attributes {
                  id
                  name
                  type
                  items {
                    _id  
                    id
                    value
                    displayValue
                  }
              }
          }
      }`;
}

class ProductDetailsPage extends React.Component<
  ProductDetailsPageProps,
  ProductDetailsPageState
> {
  static contextType = ApolloClientContext;
  context!: ApolloClient<object>;

  state: ProductDetailsPageState = {
    product: this.props.location.state?.product ?? null,
    loading: false,
    error: null,
  };

  async fetchProduct() {
    const client = this.context;
    this.setState({ loading: true, error: null });

    try {
      const result = await client.query<{
        product: Product;
      }>({
        query: getProductQuery(this.props.match.params.productId),
      });
      this.setState({
        product: result.data.product,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: error as Error, loading: false });
    }
  }

  componentDidMount() {
    if (!this.state.product) {
      this.fetchProduct();
    }
  }

  render(): React.ReactNode {
    if (!this.state.product) return null;
    return (
      <div className="w-5/6 mx-auto mt-16 lg:flex gap-24">
        <Carousel gallery={this.state.product.gallery} />
        <ProductDetails
          addToCart={this.props.addToCart}
          product={this.state.product}
        />
      </div>
    );
  }
}

export default withRouter(ProductDetailsPage);
