import React from "react";

class AddToCart extends React.Component {
  render(): React.ReactNode {
    return (
      <button
        type="submit"
        data-testid="add-to-cart"
        className="my-4 w-full py-4 px-8 font-semibold text-white bg-primary"
      >
        Add to cart
      </button>
    );
  }
}

export default AddToCart;
