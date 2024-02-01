import React from "react";
import "./Card.css";

const Card = ({ title, children }) => {
  return (
    <div className="card_container">
      <label>
        <h1>{title}</h1>
      </label>
      <div className="content_container">{children}</div>
    </div>
  );
};

export default Card;
