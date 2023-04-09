import React, { useState } from "react";
import arror from "/src/assets/tools/icons/arrowleft.png";
import { Link } from "react-router-dom";
import { CartContextProvider, useCartContext } from "../context/CartContext";
const date = new Date();
function Buynow() {
  const { newData } = useCartContext();
  const [customer, setcustomer] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    time: {
      dd: date.getDate(),
      mm: date.getMonth(),
      yy: date.getFullYear(),
    },
  });

  function checkEmptyField() {
    if (
      customer.name.length == 0 ||
      customer.email.length == 0 ||
      customer.mobile.length == 0
    )
      alert("complete me!!");
    else {
      alert("Order confirmed!!");
      window.location.reload();
    }
  }
  return (
    <CartContextProvider>
      <div
        className="buy_card"
        style={{
          display: "grid",
          padding: "1rem",
          width: "100%",
          height: "100dvh",
          zIndex: "120",
          backgroundColor: "white",
        }}
      >
        <header>
          <Link to={"/yourcart"}>
            <button className="btn btn-basic btn-m-0">
              <img src={arror} alt="" />
            </button>
          </Link>
          <div className="login_alert">
            <h5>You are not logged in. Login to confirm your order easily.</h5>
            <Link to={"/account/login"}>Login</Link>
          </div>
        </header>
        <main>
          <section className="sect location">
            <h2>Your location</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <section className="form_box">
                <label htmlFor="name">Name *</label>
                <input
                  value={customer.name}
                  onChange={(e) =>
                    setcustomer((pre) => ({ ...pre, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  type="text"
                  name="name"
                  id="name"
                />
              </section>
              <section className="form_box">
                <label htmlFor="email">Em@il</label>
                <input
                  value={customer.email}
                  onChange={(e) =>
                    setcustomer((pre) => ({ ...pre, email: e.target.value }))
                  }
                  placeholder="Your email address"
                  type="email"
                  name="email"
                  id="email"
                />
              </section>
              <section className="form_box">
                <label htmlFor="tel">Contact Number *</label>
                <input
                  value={customer.mobile}
                  onChange={(e) =>
                    setcustomer((pre) => ({ ...pre, mobile: e.target.value }))
                  }
                  placeholder="Mobile number(only for Bangladesh)"
                  type="tel"
                  name="tel"
                  id="tel"
                  maxLength={11}
                />
              </section>
              <section className="form_box">
                <label htmlFor="name">Name *</label>
                <textarea
                  style={{ resize: "none" }}
                  placeholder={`Shipping Address\nProducts will be delivered here`}
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) =>
                    setcustomer((pre) => ({ ...pre, address: e.target.value }))
                  }
                />
              </section>
            </form>
          </section>
          <section className="sect payment">
            <h2>Payment info</h2>
            <article>
              <div className="custoinfo">
                <h4>Customer Info</h4>
                <p>Name: {customer.name ? customer.name : "not provided"}</p>
                <p>Email: {customer.email ? customer.email : "not provided"}</p>
                <p>
                  Mobile: {customer.mobile ? customer.mobile : "not provided"}
                </p>
                <p>
                  Address:{" "}
                  {customer.address ? customer.address : "not provided"}
                </p>
              </div>
              <div className="itemsInfo">
                <h4>Ordered Items</h4>

                {newData.map((ele, id) => {
                  return (
                    <p>
                      {ele.title} -- {ele.taka}
                    </p>
                  );
                })}
              </div>
            </article>
            <button className="confirm" onClick={checkEmptyField}>
              confirm
            </button>
          </section>
        </main>
      </div>
    </CartContextProvider>
  );
}

export default Buynow;
