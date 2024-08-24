import React from "react";
import gql from "graphql-tag";
import { ApolloClient } from "@apollo/client";
import ApolloClientContext from "../ApolloClientContext.tsx";

interface HeaderState {
  categories: string[];
  error: Error | null;
  loading: boolean;
}

interface HeaderProps {
  changeCurrentCategory: (category: string) => void;
  currentCategory: string;
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

class Header extends React.Component<HeaderProps> {
  static contextType = ApolloClientContext;
  context!: ApolloClient<object>;

  state: HeaderState = {
    categories: [],
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
    return (
      <header className="shadow-xl relative">
        <div className="absolute left-1/2 top-2 -translate-x-1/2 cursor-pointer">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="flex justify-between w-5/6 pt-2 mx-auto items-center">
          <nav>
            <ul className="flex gap-3 list-none">
              {this.state.categories.map((category, index) => (
                <li
                  data-testid={
                    this.props.currentCategory === category
                      ? "active-category-link"
                      : "category-link"
                  }
                  key={index}
                  className={`uppercase hover:text-primary border-primary cursor-pointer px-4 hover:border-b-2 pb-4 ${
                    category === this.props.currentCategory
                      ? "text-primary border-b-2"
                      : ""
                  }`}
                  onClick={() => {
                    this.props.changeCurrentCategory(category);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          </nav>
          <div className="cursor-pointer">
            <img src="/cart.svg" alt="logo" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
