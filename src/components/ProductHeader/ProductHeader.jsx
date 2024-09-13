import React from "react";
import "./ProductHeader.css";

const ProductHeader = () => {
  return (
    <div>
      <header>
        <div className="overlay">
          <h1>Healthy Edibles Dry Fruits</h1>
          <h3>with your own Foodie</h3>
          <p>
            In this store, you can find your any favorite eatables to eat. It is
            made from pure ingredients
          </p>
          <br />
          <button>Explore</button>
        </div>
      </header>
    </div>
  );
};

export default ProductHeader;
