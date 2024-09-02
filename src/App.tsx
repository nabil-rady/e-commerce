import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./Components/ProductListing.tsx";
import ProductDetailsPage from "./Components/ProductDetailsPage.tsx";
import Header from "./Components/Header.tsx";
import CartOverlay from "./Components/CartOverlay.tsx";

import { Cart } from "./types/Cart.ts";
import { Product } from "./types/Product.ts";
import { Attribute } from "./types/Attribute.ts";
import areObjectsEqual from "./utils/areObjectsEqual.ts";

interface AppState {
  currentCategory: string;
  cart: Cart;
  overlayOpen: boolean;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    currentCategory: "All",
    cart:
      localStorage.getItem("cart") !== null
        ? (JSON.parse(localStorage.getItem("cart") as string) as Cart)
        : {},
    overlayOpen: false,
  };

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>) {
    if (!areObjectsEqual(prevState.cart, this.state.cart)) {
      localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }
  }

  changeCurrentCategory = (category: string) => {
    this.setState({
      currentCategory: category,
    });
  };

  addToCart = (product: Product, selectedAttributes?: Attribute[]) => {
    selectedAttributes =
      selectedAttributes ??
      (product.attributes.map(
        (attributeSet) => attributeSet.items[0]
      ) as Attribute[]);
    this.setState((prevState) => {
      if (prevState.cart[product.id] === undefined) {
        return {
          ...prevState,
          cart: {
            ...prevState.cart,
            [product.id]: [
              {
                product,
                quantity: 1,
                selectedAttributes,
              },
            ],
          },
        };
      }
      if (
        prevState.cart[product.id].some((el) => {
          for (let i = 0; i < el.selectedAttributes.length; i++) {
            if (selectedAttributes[i].id !== el.selectedAttributes[i].id) {
              return false;
            }
          }
          return true;
        })
      ) {
        return prevState;
      }
      return {
        ...prevState,
        cart: {
          ...prevState.cart,
          [product.id]: [
            ...prevState.cart[product.id],
            {
              product,
              quantity: 1,
              selectedAttributes,
            },
          ],
        },
      };
    });
  };

  toggleOverlay = () => {
    this.setState((prevState) => ({
      ...prevState,
      overlayOpen: !prevState.overlayOpen,
    }));
  };

  closeOverlay = () => {
    this.setState({
      overlayOpen: false,
    });
  };

  incQuantity = (product: Product, index: number) => {
    this.setState((prevState) => {
      if (prevState.cart[product.id] === undefined) return prevState;

      const prevCartProduct = [...prevState.cart[product.id]];
      prevCartProduct.splice(index, 1, {
        ...prevCartProduct[index],
        quantity: prevCartProduct[index].quantity + 1,
      });

      return {
        ...prevState,
        cart: {
          ...prevState.cart,
          [product.id]: prevCartProduct,
        },
      };
    });
  };

  decQuantity = (product: Product, index: number) => {
    this.setState((prevState) => {
      if (prevState.cart[product.id] === undefined) return prevState;

      const prevCartProduct = [...prevState.cart[product.id]];
      if (prevCartProduct[index].quantity === 1) {
        prevCartProduct.splice(index, 1);
      } else {
        prevCartProduct.splice(index, 1, {
          ...prevCartProduct[index],
          quantity:
            prevCartProduct[index].quantity - 1 <= 0
              ? 1
              : prevCartProduct[index].quantity - 1,
        });
      }

      return {
        ...prevState,
        cart: {
          ...prevState.cart,
          [product.id]: prevCartProduct,
        },
      };
    });
  };

  render(): React.ReactNode {
    return (
      <Router>
        <div className="bg-white">
          <Header
            cart={this.state.cart}
            overlayOpen={this.state.overlayOpen}
            currentCategory={this.state.currentCategory}
            changeCurrentCategory={this.changeCurrentCategory}
            toggleOverlay={this.toggleOverlay}
            closeOverlay={this.closeOverlay}
          />
          <Switch>
            <Route
              path="/product/:productId"
              render={(props) => (
                <ProductDetailsPage {...props} addToCart={this.addToCart} />
              )}
            />
            <Route
              path="/:categoryName"
              render={(props) => (
                <ProductListing
                  {...props}
                  addToCart={this.addToCart}
                  changeCurrentCategory={this.changeCurrentCategory}
                />
              )}
            />
            <Route
              path="/"
              render={(props) => (
                <ProductListing
                  {...props}
                  addToCart={this.addToCart}
                  changeCurrentCategory={this.changeCurrentCategory}
                />
              )}
            />
          </Switch>
          <CartOverlay
            open={this.state.overlayOpen}
            cart={this.state.cart}
            closeOverlay={this.closeOverlay}
            incQuantity={this.incQuantity}
            decQuantity={this.decQuantity}
          />
        </div>
      </Router>
    );
  }
}

export default App;
