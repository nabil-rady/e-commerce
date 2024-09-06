import React from "react";
import gql from "graphql-tag";
import { ApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";
import ApolloClientContext from "../ApolloClientContext.tsx";
import { Cart } from "../types/Cart.ts";
import countProductsInCart from "../utils/countProductsInCart.ts";

interface HeaderState {
  categories: string[];
  error: Error | null;
  loading: boolean;
}

interface HeaderProps {
  currentCategory: string;
  cart: Cart;
  overlayOpen: boolean;
  changeCurrentCategory: (category: string) => void;
  toggleOverlay: () => void;
  closeOverlay: () => void;
}

interface Category {
  name: string;
}

const GET_CATEGORIES_QUERY = gql`
  query Query {
    categories {
      name
    }
  }
`;

class Header extends React.Component<HeaderProps, HeaderState> {
  static contextType = ApolloClientContext;
  context!: ApolloClient<object>;

  state: HeaderState = {
    categories: ["All", "Clothes", "Tech"],
    error: null,
    loading: true,
  };

  fetchCategories = async () => {
    const client = this.context;
    this.setState({ loading: true, error: null });

    try {
      const result = await client.query<{
        categories: Category[];
      }>({
        query: GET_CATEGORIES_QUERY,
      });
      this.setState({
        categories: result.data.categories.map((category) => category.name),
        loading: false,
      });
    } catch (error) {
      this.setState({ error: error as Error, loading: false });
    }
  };

  componentDidMount() {
    this.fetchCategories().catch((err) => console.error(err));
  }

  render(): React.ReactNode {
    const count = countProductsInCart(this.props.cart);
    return (
      <header className="relative">
        <div className="absolute left-1/2 top-2 -translate-x-1/2 cursor-pointer">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="flex justify-between w-5/6 pt-2 mx-auto items-center">
          <nav className="font-semibold">
            <ul className="flex gap-1 list-none">
              {this.state.categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/${category.toLocaleLowerCase()}`}
                  onClick={() => this.props.changeCurrentCategory(category)}
                  data-testid={
                    this.props.currentCategory === category
                      ? "active-category-link"
                      : "category-link"
                  }
                >
                  <li
                    className={`uppercase hover:text-primary border-primary cursor-pointer px-5 hover:border-b-2 pb-4 ${
                      category === this.props.currentCategory
                        ? "text-primary border-b-2"
                        : ""
                    }`}
                  >
                    {category}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <button
            className="relative cursor-pointer"
            onClick={this.props.toggleOverlay}
          >
            {count !== 0 && (
              <div className="absolute font-roboto flex justify-center items-center w-[20px] h-[20px] leading-none rounded-full font-bold text-sm text-white bg-darkGray right-0 top-0 translate-x-1/2 -translate-y-1/2">
                {count}
              </div>
            )}
            <img src="/cart.svg" alt="logo" />
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
