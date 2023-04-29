import React, { useEffect, useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { fdb } from "../../../firebase";
import arror from "/src/assets/tools/icons/arrowleft.png";
import { Link } from "react-router-dom";
import {
  addToCart_LocalStorage,
  formatMoneyIntoBDT,
} from "../Hooks/customHooks";
const date = new Date();
function Buynow() {
  const { price, cartRef, orderRef, updatePrice } = addToCart_LocalStorage();
  const [newData, setNewData] = useState([]);
  const [hasOrder, setHasOrder] = useState(null);
  const [customer, setcustomer] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    tokenID: "",
  });
  useEffect(() => {
    let c_name = customer.name;
    c_name = c_name.split(" ");
    console.log(c_name);
    setcustomer((pre) => ({
      ...pre,
      tokenID:
        customer.name &&
        c_name[0].toUpperCase() +
          Math.floor(Math.random() * 100) +
          date.getDate(),
    }));
  }, [customer.name]);

  // function for sending order to admin
  async function checkEmptyField() {
    if (
      customer.name.length == 0 ||
      customer.address.length == 0 ||
      customer.mobile.length == 0
    )
      alert("Please complete all the required field!!");
    else {
      if (newData)
        await addDoc(collection(fdb, "orders"), {
          cust_name: customer.name,
          cust_email: customer.email,
          cust_phone: customer.mobile,
          cust_add: customer.address,
          totalPrice: price + 90,
          orderedtime: serverTimestamp(),
          orderdItems: arrayUnion({ newData }),
        })
          .then(() => {
            localStorage.removeItem(cartRef);
            localStorage.setItem(
              "my_orders",
              JSON.stringify({
                id: customer.tokenID,
                isConfirmed: false,
                time: {
                  dd: date.getDate(),
                  mm: date.getMonth(),
                  yy: date.getFullYear(),
                },
              })
            );
            alert(`Order confirmed\nYour token id is ${customer.tokenID}`);

            window.location.reload();
          })
          .catch((err) => {
            alert("Something went wrong, please try again or later");
          });
      else {
        alert(
          "You have no product to be ordered. Visit our page to buy new one"
        );
      }
    }
  }
  useEffect(() => {
    setNewData(JSON.parse(localStorage.getItem(cartRef)));
    setHasOrder(JSON.parse(localStorage.getItem(orderRef)));
    updatePrice();
  }, []);
  return (
    <div className="buy_card">
      <header>
        <Link to={"/"}>
          <button className="btn btn-basic btn-m-0">
            <img src={arror} alt="" />
          </button>
        </Link>
        <div className="login_alert">
          <h5>You are not logged in. Login to confirm your order easily.</h5>
          <Link to={"/account/login"}>Login</Link>
        </div>

        {!hasOrder?.isConfirmed && (
          <div>
            You have a old order. <br /> Your token id is:{" "}
            <span style={{ fontWeight: "bold" }}>{hasOrder?.id}</span>
            <br />
            <span>
              Ordered Time: {hasOrder?.time?.dd}/{hasOrder?.time?.mm}/
              {hasOrder?.time?.yy}
            </span>
          </div>
        )}
      </header>
      <main>
        <section className="sect location">
          <h2>Location info</h2>
          <small style={{ color: "crimson" }}>
            * marked fileds are required
          </small>

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
              <label htmlFor="address">Address *</label>
              <textarea
                style={{ resize: "none" }}
                placeholder={`Shipping Address\nProducts will be delivered here`}
                type="text"
                name="address"
                id="address"
                onChange={(e) =>
                  setcustomer((pre) => ({ ...pre, address: e.target.value }))
                }
              />
            </section>
          </form>
        </section>
        <section className="sect payment">
          <h2>Delivery Details</h2>
          <article>
            <div className="custoinfo">
              <h4>Receiver info</h4>
              {customer?.name && <p>Name: {customer.name}</p>}
              {customer?.email && <p>Email: {customer.email}</p>}
              {customer?.mobile && <p>Mobile: {customer.mobile}</p>}

              {customer?.address && <p>Address: {customer.address}</p>}
            </div>
            <div className="itemsInfo">
              <h4>Payment info</h4>
              <Link
                to={"/yourcart"}
                style={{
                  textDecoration: "none",
                }}
              >
                <button
                  className="btn-black btn-m-0 btn-px-2 btn-py-1"
                  style={{
                    fontSize: ".85rem",
                    cursor: "pointer",
                  }}
                >
                  Chekout cart
                </button>
              </Link>
              {newData?.map((ele, id) => {
                return (
                  <p key={id}>
                    <span>{id + 1}. </span> {ele?.title}
                    {`( x${ele?.quantity})`} --{" "}
                    {formatMoneyIntoBDT(ele?.taka * ele?.quantity)} BDT
                  </p>
                );
              })}
            </div>
          </article>
          <section className="price">
            <article
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                margin: "5px auto",
              }}
            >
              <p>
                Delivery cost:{" "}
                <small>
                  <b>
                    {"("}cash on delivery{")"}
                  </b>
                </small>
              </p>
              <p>100 BDT</p>
            </article>
            <hr />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
                margin: "5pt auto",
              }}
            >
              <article>
                <span>Total </span>
                <h4>{formatMoneyIntoBDT(price + 100)} BDT</h4>
              </article>
              <button className="confirm" onClick={checkEmptyField}>
                confirm
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Buynow;
