import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  addToCart_LocalStorage,
  convert_numToUnit,
  formatMoneyIntoBDT,
} from "./Hooks/customHooks";
import watch from "../assets/watch.png";
function Items({ props, id }) {
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
  const { addItem, cartRef, lcoal_storage } = addToCart_LocalStorage();
  const itemCart = useMemo(() => {
    return (
      <div
        style={{
          backgroundColor: "white",
          width: "160pt",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "7pt",
          borderRadius: "10px",
          textDecoration: "none",
          border: "1pt solid gray",
          marginBottom: "1rem",
        }}
      >
        <Link
          to={`item/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {/* photo of product */}
          <img
            style={{ margin: "0  auto" }}
            src={props?.img ? props?.img : watch}
            alt="product"
            width={"100%"}
            height={"auto"}
          />
          {/*product's title */}

          <p className="item_link">{props?.title}</p>
        </Link>

        <br />
        {/* ratings */}
        <p
          style={{
            color: "#808080",
          }}
        >
          <span>
            <Star />
            {props?.rate ? `${props?.rate}/5` : "New "}
          </span>{" "}
          {props?.sold && <span>| {convert_numToUnit(props?.sold)} sold</span>}
        </p>
        {/* taka */}
        <h3 style={{ color: "#00A507" }}>
          {formatMoneyIntoBDT(props?.taka, "")} <small>BDT</small>
        </h3>
        <button
          style={{
            width: "100%",
            height: "auto",
            padding: "5pt",
            border: "0",
            cursor: "pointer",
            backgroundColor: JSON.parse(lcoal_storage.getItem(cartRef))?.find(
              (data) => data?.itemID == props?.itemID
            )
              ? "#323277"
              : "#eaea55",
            color: JSON.parse(lcoal_storage.getItem(cartRef))?.find(
              (data) => data?.itemID == props?.itemID
            )
              ? "white"
              : "black",
            fontWeight: "600",
            fontSize: "1.01em",
          }}
          onClick={() => addItem(props, props?.itemID)}
        >
          {JSON.parse(lcoal_storage.getItem(cartRef))?.find(
            (data) => data?.itemID == props?.itemID
          )
            ? "Added"
            : "Add to cart"}
        </button>
      </div>
    );
  }, [lcoal_storage.getItem(cartRef)]);
  return <>{itemCart}</>;
}

export default Items;
