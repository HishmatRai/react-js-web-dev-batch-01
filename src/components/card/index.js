import React from "react";
const Card = ({ title, children }) => {
  return (
    <div style={{ border: "2px solid red", margin: "15px" }}>
      <p>{title}</p>
      {children}
    </div>
  );
};
export default Card;
