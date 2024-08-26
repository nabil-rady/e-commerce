import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./Components/ProductListing.tsx";
import ProductDetailsPage from "./Components/ProductDetailsPage.tsx";
import Header from "./Components/Header.tsx";

interface AppState {
  currentCategory: string;
}

class App extends React.Component {
  state: AppState = {
    currentCategory: "All",
  };

  changeCurrentCategory = (category: string) => {
    this.setState({
      currentCategory: category,
    });
  };

  render(): React.ReactNode {
    return (
      <Router>
        <div className="bg-white">
          <Header currentCategory={this.state.currentCategory} />
          <Switch>
            <Route path="/product/:productId" component={ProductDetailsPage} />
            <Route path="/:category" component={ProductListing} />
            <Route path="/" component={ProductListing} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
