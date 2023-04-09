import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import arrback from "../assets/tools/icons/arrowleft.png";
import { CartContextProvider, useCartContext } from "./context/CartContext";
import EachCart from "./Cart";
import { formatMoneyIntoBDT } from "./Hooks/customHooks";
// ${
//!screenSize || screenSize.width < 786 ? "mobile" : //"desktop"
//}
function YourCart() {
  const { newData, price, toggleItems, deleteCart } = useCartContext();
  const [showBuy, setShowBuy] = useState(false);
  function handleBuy(setBuy) {
    setShowBuy(setBuy);
  }

  const BuyNow = () => {
    return (
      <div className={`buynow ${showBuy ? "show" : "hidden"} `}>
        <button
          className="btn btn-red btn-txt-white"
          style={{
            textTransform: "capitalize",
          }}
          onClick={() => handleBuy(false)}
        >
          close
        </button>
        <h2>Buy Now</h2>
        <table className="table_buy_cart" cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Item ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
            </tr>
          </thead>
          {newData.map((ele, id) => {
            return (
              <tr>
                <td>
                  <img width={30} src={ele.img} alt="" />
                </td>
                <td>{ele.itemID}</td>
                <td>{ele.title}</td>
                <td>{ele.type}</td>
                <td>{ele.taka}</td>
              </tr>
            );
          })}
        </table>
        <Link
          to={"/paymentconfirm"}
          style={{
            textDecoration: "none",
          }}
        >
          <button className="  btn-next">Next</button>
        </Link>
      </div>
    );
  };
  // memo for update of total price
  const totalPrice = useMemo(() => {
    return (
      <CartContextProvider>
        <div className={`totalprice mobile`}>
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
            <button className="btn btn-red btn-txt-white" onClick={deleteCart}>
              Delete
            </button>
            <button className="btn btn-black" onClick={() => handleBuy(true)}>
              Buy now
            </button>
          </section>
        </div>
      </CartContextProvider>
    );
  }, [newData, price]);

  return (
    <CartContextProvider>
      <div className={` yourcart ${showBuy ? "isBuy" : ""}`}>
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
        <BuyNow />
        <div className="main">
          {/* selected product or cart */}

          <section className="list selectedList">
            <h4>your Products</h4>
            {newData == 0 || newData?.length == 0 ? (
              <h2 style={{ textAlign: "center", color: "tomato" }}>
                No item to show. Please select your product and then visit here
              </h2>
            ) : (
              <div className="list-grid cart_datas">
                {newData?.map((data, id) => {
                  return (
                    <EachCart
                      key={id}
                      props={data}
                      id={data?.title}
                      dispatch={() => toggleItems(data.itemID)}
                    />
                  );
                })}
              </div>
            )}
          </section>
          {totalPrice}
        </div>
      </div>
    </CartContextProvider>
  );
}

export default YourCart;
