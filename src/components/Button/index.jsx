import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button className="botao" type={props.type}>
      {props.children}
    </button>
  );
}
