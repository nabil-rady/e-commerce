import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import gql from "graphql-tag";
import { ApolloClient } from "@apollo/client";

import Header from "./Header.tsx";
import { Product } from "../types/Product.ts";
import ProductComponent from "./Product.tsx";
import ApolloClientContext from "../ApolloClientContext.tsx";

interface ProductListingProps
  extends RouteComponentProps<{ category?: string }> {}

interface ProductListingState {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

function getProductQuery(category: string) {
  return gql`
    query Query {
        products(category: "${category}") {
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
                id
                value
                displayValue
                }
            }
        }
    }`;
}

class ProductListing extends React.Component<ProductListingProps> {
  static contextType = ApolloClientContext;
  context!: ApolloClient<object>;

  state: ProductListingState = {
    products: [],
    loading: true,
    error: null,
  };

  async fetchProducts() {
    const client = this.context;
    this.setState({ loading: true, error: null });

    try {
      const result = await client.query<{
        products: Product[];
      }>({
        query: getProductQuery(this.props.match.params.category ?? "All"),
      });
      this.setState({
        products: result.data.products,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: error as Error, loading: false });
    }
  }

  componentDidUpdate(prevProps: Readonly<ProductListingProps>) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.fetchProducts().catch((err) => console.error(err));
    }
  }

  componentDidMount() {
    this.fetchProducts().catch((err) => console.error(err));
  }

  render(): React.ReactNode {
    return (
      <>
        <Header currentCategory={this.props.match.params.category ?? "All"} />
        <div className="m-5 w-5/6 mx-auto">
          <h2 className="text-4xl my-16">
            {this.props.match.params.category ?? "All"}
          </h2>
          <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-3 gap-y-5 justify-items-stretch">
            {this.state.products.map((product, index) => (
              <ProductComponent
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ProductListing);
