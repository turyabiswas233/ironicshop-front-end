import React from "react";
import { Link } from "react-router-dom";
import { convert_numToUnit, formatMoneyIntoBDT } from "./Hooks/customHooks";

function Items({ props, itemId }) {
  const Star = () => (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
        fill="#FFD600"
      />
    </svg>
  );

  return (
    <Link
      to={`item/${itemId}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "160px",
          display: "block",
          padding: "7pt",
          borderRadius: "10px",
          textDecoration: "none",
          boxShadow: "0 0 10px slateblue",
        }}
      >
        {/* photo of product */}
        <img
          style={{ margin: "0px auto" }}
          src={props?.img}
          alt="product"
          width={"100%"}
          height={"auto"}
        />
        {/*product's title */}

        <p className="item_link">{props?.title}</p>

        <br />
        {/* ratings */}
        <p
          style={{
            color: "#808080",
          }}
        >
          <span>
            <Star />
            {props?.rate}/5{" "}
          </span>{" "}
          | {/* how much sold ? */}
          <span>{convert_numToUnit(props?.sold)} sold</span>
        </p>
        {/* taka */}
        <h3 style={{ color: "#00A507" }}>
          {formatMoneyIntoBDT(props?.taka, "shortBDT")}
        </h3>
      </div>
    </Link>
  );
}

export default Items;
