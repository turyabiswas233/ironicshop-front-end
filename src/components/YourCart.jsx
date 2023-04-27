import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import arrback from "../assets/tools/icons/arrowleft.png";

import EachCart from "./Cart";
import {
  addToCart_LocalStorage,
  formatMoneyIntoBDT,
} from "./Hooks/customHooks";
// ${
//!screenSize || screenSize.width < 786 ? "mobile" : //"desktop"
//}
function YourCart() {
  const [newData, setnewData] = useState([]);
  const {
    lcoal_storage,
    price,
    cartRef,
    updatePrice,
    handleToggle,
    deleleSelectedItems,
  } = addToCart_LocalStorage();

  useEffect(() => {
    let curArr = JSON.parse(lcoal_storage.getItem(cartRef));
    setnewData(curArr);
  }, [lcoal_storage.getItem(cartRef)]);
  useEffect(() => {
    updatePrice();
  });

  // memo for update of total price
  const totalPrice = useMemo(() => {
    return (
      <div className={`totalprice `}>
        <section className="left">
          <p>
            Total selected item:{" "}
            <span>{newData?.filter((data) => data?.isSelected).length}</span>
          </p>
          <h3 className="price">
            {formatMoneyIntoBDT(price, "en")}{" "}
            <small>
              <small>BDT</small>
            </small>
          </h3>
        </section>
        <section className="right">
          <button
            className="btn btn-red btn-txt-white"
            onClick={() => {
              deleleSelectedItems();
              updatePrice();
            }}
          >
            Delete
          </button>
          <Link
            to={"/paymentconfirm"}
            style={{
              textDecoration: "none",
            }}
          >
            <button className="btn btn-black">Buy now</button>
          </Link>
        </section>
      </div>
    );
  }, [newData, price]);

  return (
    <div className={` yourcart  `}>
      <header>
        <span>
          <Link to={"/"}>
            <button className="btn btn-basic">
              <img src={arrback} width={25} alt="" />
            </button>
          </Link>
        </span>
        <h3>Cart</h3>
      </header>

      <div className="main">
        {newData && totalPrice}
        {/* selected product or cart */}

        <section className="list ">
          <h4>your Products</h4>
          {!newData || newData?.length == 0 ? (
            <h2 style={{ textAlign: "center", color: "tomato" }}>
              No item to show. Please select your product and then visit here
            </h2>
          ) : (
            <div className="cartTable ">
              {newData?.map((data, id) => {
                return (
                  <EachCart
                    key={id}
                    props={data}
                    id={data?.itemID}
                    handleToggle={() => handleToggle(data?.itemID)}
                    upPrice={updatePrice}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default YourCart;
