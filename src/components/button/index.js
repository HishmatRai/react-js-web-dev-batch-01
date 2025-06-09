import React from "react";
import "./index.css";
const Button = (props) => {
  console.log("props button ---->", props.title);
  return (
    <button
      className="btn"
      onClick={props.onClick}
      style={{
        color: props.color,
        borderRadius: props.borderRadius ? "10px" : "0px",
      }}
    >
      {props.title === undefined ? "Button" : props.title}
    </button>
  );
};
export default Button;
