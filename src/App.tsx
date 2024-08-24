import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./Components/ProductListing.tsx";

interface AppState {
  currentCategory: string;
}

class App extends React.Component {
  state: AppState = {
    currentCategory: "all",
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
          <Switch>
            <Route path="/:category" component={ProductListing} />
            <Route path="/" component={ProductListing} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
