import React from "react";

class Loading extends React.Component {
  render() {
    return (
      <div className="inline-block mr-5 w-6 h-6 bg-transparent border-2 border-l-transparent border-r-transparent border-white rounded-full animate-spin"></div>
    );
  }
}

export default Loading;
