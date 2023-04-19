import React from "react";
import { formatMoneyIntoBDT } from "./Hooks/customHooks";

//components
import watch from "../assets/watch.png";
const EachCart = ({ props, id, handleToggle }) => {
  return (
    <tr
      key={id}
      className="cart"
      style={{
        cursor: "pointer",
      }}
      onClick={handleToggle}
    >
      <td className="img">
        <img src={watch} width={50} alt="" />
      </td>

      <td>{props?.title}</td>
      <td>{id}</td>

      <td>{formatMoneyIntoBDT(props?.taka, "shortBDT")}</td>
      <td>
        <span
          className={`selector ${
            props?.isSelected ? "selected" : "not-selected"
          }`}
        ></span>
      </td>
    </tr>
  );
};
export default EachCart;
