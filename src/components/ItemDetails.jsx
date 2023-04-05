// images
import arrLeft from "../assets/tools/icons/arrowleft.png";
import shoppingcart from "../assets/tools/icons/shoppingcart.png";
import send from "../assets/tools/icons/send.png";
// react functions and custom hooks
import { Link } from "react-router-dom";
import { formatMoneyIntoBDT } from "./Hooks/customHooks";
import { datas } from "../data/data";
import { useEffect, useState } from "react";
import { useCartContext } from "./context/CartContext";

function ItemDetails() {
  const id = window.location.pathname;
  const arrID = id.slice(6, -1) + id.slice(-1);
  const productDB = datas.filter((data) => data.itemID == arrID);
  const { addToCart } = useCartContext();

  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      function showScrollY() {
        let yaxis = window.scrollY;
        setScroll(yaxis / 360);
      }

      window.addEventListener("scroll", (e) => {
        showScrollY();
      });
      window.removeEventListener("scroll", showScrollY());
    }
  });

  const StarYellow = () => {
    const arrY = [];
    const arrD = [];

    const starty = (
      <>
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z"
            fill="#FFD600"
          />
        </svg>
      </>
    );
    const startd = (
      <>
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z"
            fill="#B4B4B4"
          />
        </svg>
      </>
    );

    for (let i = 0; i < productDB[0]?.rate; i++) {
      arrY.push(starty);
    }
    for (let i = 0; i < 5 - productDB[0]?.rate; i++) {
      arrD.push(startd);
    }
    return (
      <>
        {arrY.map((star, id) => {
          return <span key={id}>{star}</span>;
        })}
        {arrD.map((star, id) => {
          return <span key={id}>{star}</span>;
        })}
      </>
    );
  };
  const starW = (
    <>
      <svg
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z"
          fill="#ffffff"
        />
      </svg>
    </>
  );

  const Review = ({ user }) => {
    return (
      <div className="eachReview">
        <header>
          <section className="left">
            <span>P</span>
            <p className="name">Name</p>
          </section>
          <section className="right">
            <StarYellow />
          </section>
        </header>
        <article className="message">
          <p className="p1"></p>
          <p className="p2"></p>
        </article>
      </div>
    );
  };
  return (
    <div className="itemDetails">
      <header
        className="root_header"
        style={{
          backgroundColor: scroll < 1 ? "transparent" : "#fff",
          boxShadow: scroll < 1 ? "" : "0px 5px 5px #0004",
        }}
      >
        <section className="navigation">
          {/* return to home btn */}
          <Link to={"/"}>
            <button className="btn btn-basic">
              <img src={arrLeft} alt="" width={20} height={20} />
            </button>
          </Link>
          <Link to={"/"} style={{ textDecoration: "none", marginLeft: "10pt" }}>
            <button className="btn btn-basic">iRonic shop</button>
          </Link>
          <Link to={"/yourcart"} title={"Checkout cart"}>
            <button className="btn btn-basic  ">
              {" "}
              <img
                style={{ filter: "invert(1)" }}
                src={shoppingcart}
                alt=""
                width={20}
                height={20}
              />
            </button>
          </Link>
        </section>
      </header>
      {/* hero */}
      <div className="hero">
        <section
          className="photo"
          style={{
            opacity: scroll < 1 ? 1 - scroll : 0,
            // transition: "all 100ms ease-in",
            transform: `scale(${scroll < 1 ? 1 - scroll : 0})`,
          }}
        >
          <ul className="list">
            <li></li>
            <li className="active_photo"></li>
            <li></li>
          </ul>
          <img src={productDB[0]?.img} alt="" />
        </section>
        <div className="details">
          <section className="info">
            <h2 className="title">{productDB[0]?.title} Not for sale.</h2>
            <h2 className="pro_id">
              Product ID: <span> {productDB[0].itemID}</span>
            </h2>
            <span className="rating">
              <StarYellow />
              {productDB[0]?.rate}
              {"/5"}
            </span>
            <p>
              {productDB[0]?.title} is a wearable {productDB[0]?.type} that
              allows users to accomplish a variety of tasks, including making
              phone calls, sending text messages and reading email ...{" "}
              <span style={{ color: "blue" }}>more</span>
            </p>
          </section>
          <section className="size">
            <hr className="hr" />
            <h3>size</h3>
            <ul>
              <li>40mm</li>
              <li>42mm</li>
              <li>44mm</li>
              <li>46mm</li>
            </ul>
          </section>
          <section className="avail_col">
            <hr className="hr" />
            <h2>Available color</h2>
            <ul>
              <li className="pink"></li>
              <li className="violet"></li>
              <li className="blue"></li>
              <li className="green"></li>
            </ul>
          </section>
          <section className="price">
            <p>
              <span className="taka">BDT</span>
              {formatMoneyIntoBDT(productDB[0]?.taka)}
            </p>
            <article>
              <button
                className="btn btn-cart"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => addToCart(productDB[0].itemID)}
              >
                Add to cart
                <img
                  style={{ filter: "invert(1)", marginLeft: "4pt" }}
                  src={shoppingcart}
                  alt=""
                />
              </button>
              <button className="btn btn-black btn-txt-white btn-buy ">
                Buy Now
              </button>
            </article>
          </section>
          <section className="review">
            <header className="review_root_head">
              <h2>Review</h2>
              <span className="rating">
                {starW}
                {`${productDB[0]?.rate}/5`}
              </span>
            </header>
            <hr />
            {<Review />}
            {<Review />}
          </section>
        </div>
      </div>

      {/* question and answer */}
      <div className="que_ans">
        <article>
          <h3>Ask questions</h3>
          <hr
            style={{
              background: "#000",
              filter: "contrast(.5)",
            }}
          />
        </article>
        <section className="qustion_box">
          <input type="text" name="" id="" placeholder="Type..." />
          <button className="btn btn-send" type="submit">
            <img src={send} alt="" />
          </button>
        </section>
      </div>
    </div>
  );
}

export default ItemDetails;
