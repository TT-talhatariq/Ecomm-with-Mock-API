import React from "react";
import "./EmptyScreen.css";

const EmptyScreen = ({ heading, text }) => {
  return (
    <div className="empty-container">
      <img src="assets/empty.png" alt="Empty" />
      <h1>{heading}</h1>
      <p>{text}</p>
    </div>
  );
};

export default EmptyScreen;
