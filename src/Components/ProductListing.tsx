import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import gql from "graphql-tag";
import { ApolloClient } from "@apollo/client";

import { Product } from "../types/Product.ts";
import { Attribute } from "../types/Attribute.ts";
import ProductComponent from "./Product.tsx";
import ApolloClientContext from "../ApolloClientContext.tsx";

interface ProductListingProps
  extends RouteComponentProps<{ categoryName?: string }> {
  addToCart: (product: Product, selectedAttributes?: Attribute[]) => void;
  changeCurrentCategory: (category: string) => void;
}

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
            brand
            prices {
              amount
              currency {
                label
                symbol
              }
            }
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
        query: getProductQuery(this.props.match.params.categoryName ?? "All"),
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
    if (
      this.props.match.params.categoryName !==
      prevProps.match.params.categoryName
    ) {
      this.fetchProducts().catch((err) => console.error(err));
    }
  }

  componentDidMount() {
    this.props.changeCurrentCategory(
      this.props.match.params.categoryName ?? "All"
    );
    this.fetchProducts().catch((err) => console.error(err));
  }

  render(): React.ReactNode {
    return (
      <div className="m-5 w-5/6 mx-auto">
        <h2 className="text-4xl my-16">
          {this.props.match.params.categoryName ?? "All"}
        </h2>
        <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-3 gap-y-5 justify-items-stretch">
          {this.state.products.map((product, index) => (
            <Link
              key={product.id}
              to={{
                pathname: `/product/${product.id.toLowerCase()}`,
                state: {
                  product,
                },
              }}
            >
              <ProductComponent
                addToCart={this.props.addToCart}
                product={product}
                index={index}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductListing);
