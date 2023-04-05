import React from "react";
import selector from "../assets/tools/icons/vector.png";
import { formatMoneyIntoBDT } from "./Hooks/customHooks";

const EachCart = ({ props, dispatch, count }) => {
  return (
    <div
      className="cart"
      onClick={() => {
        dispatch();
        count();
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <img src={props?.img} width={"100%"} alt="" />
      <section className="info">
        <p className="title">{props?.title}</p>
        <p className="price">{formatMoneyIntoBDT(props?.taka, "shortBDT")}</p>
      </section>
      <span
        className={`selector ${
          props?.isSelected ? "selected" : "not-selected"
        }`}
      >
        {props?.isSelected && <img src={selector} width={10} alt="" />}
      </span>
    </div>
  );
};
export default EachCart;
