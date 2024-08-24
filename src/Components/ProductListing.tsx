import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Header from "./Header.tsx";

interface ProductListingProps
  extends RouteComponentProps<{ category?: string }> {}

class ProductListing extends React.Component<ProductListingProps> {
  render(): React.ReactNode {
    return (
      <>
        <Header currentCategory={this.props.match.params.category ?? "all"} />
      </>
    );
  }
}

export default withRouter(ProductListing);
