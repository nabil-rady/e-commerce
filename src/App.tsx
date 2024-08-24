import React from "react";
import Header from "./Components/Header.tsx";

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
      <div className="bg-white">
        <Header
          changeCurrentCategory={this.changeCurrentCategory}
          currentCategory={this.state.currentCategory}
        ></Header>
      </div>
    );
  }
}

export default App;
