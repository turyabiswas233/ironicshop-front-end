import React, { useEffect, useState } from "react";
import tik from "../assets/tools/icons/vector.png";
import {
  addToCart_LocalStorage,
  formatMoneyIntoBDT,
} from "./Hooks/customHooks";

//components
import watch from "../assets/watch.png";
const EachCart = ({ props, id, handleToggle, upPrice }) => {
  const [qnt, setqnt] = useState(props?.quantity);
  const { updateQnt } = addToCart_LocalStorage();
  function incr() {
    setqnt((pre) => pre + 1);
  }
  function decr() {
    if (qnt > 1) {
      setqnt((pre) => pre - 1);
    } else {
    }
  }
  useEffect(() => {
    updateQnt(id, qnt);
    upPrice();
  }, [qnt]);
  return (
    <div key={id} className="cart">
      <article className="img">
        <img src={watch} width={150} alt="" />
      </article>
      <section className="item-info">
        <article>
          <h3>{props?.title}</h3>
          <section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              className="btn btn-m-0 btn-qnt 
"
              onClick={incr}
            >
              &#43;
            </button>
            <p className="quantity">{qnt}</p>
            <button
              className="btn btn-m-0 btn-qnt 
 "
              onClick={decr}
              disabled={qnt == 1}
            >
              &minus;
            </button>
          </section>
        </article>

        <p className="price">
          Price: <b>{formatMoneyIntoBDT(props?.taka, "")} BDT</b>
        </p>

        <span
          className={`selector ${
            props?.isSelected ? "selected" : "not-selected"
          }`}
          style={{
            cursor: "pointer",
          }}
          onClick={handleToggle}
        >
          {props?.isSelected && <img width={10} src={tik} alt="" />}
        </span>
      </section>
    </div>
  );
};
export default EachCart;
