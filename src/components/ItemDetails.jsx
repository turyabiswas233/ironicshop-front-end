// images
import arrLeft from "../assets/tools/icons/arrowleft.png";
import shoppingcart from "../assets/tools/icons/shoppingcart.png";
import watch from "../assets/watch.png";
import send from "../assets/tools/icons/send.png";
// react functions and custom hooks
import { Link } from "react-router-dom";
import {
  formatMoneyIntoBDT,
  addToCart_LocalStorage,
} from "./Hooks/customHooks";
import { useEffect, useMemo, useState } from "react";
import { Slide } from "react-slideshow-image";
import { auth, fdb } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

function ItemDetails() {
  const id = location.pathname;
  const currentUser = auth.currentUser;

  const { cartRef, addItem } = addToCart_LocalStorage();
  const [productDB, setProDB] = useState({});
  const [sizeArr, setsizearr] = useState([]);

  async function getItemDetails(pid) {
    const itemDoc = doc(fdb, `products/${pid}`);
    const item = await getDoc(itemDoc);

    setProDB({ id: item.id, ...item.data() });
    setsizearr(item?.size[0]?.sizeArr);
  }

  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const arrID = id.slice(6, -1) + id.slice(-1);

    getItemDetails(arrID).catch((err) => {
      console.log(err.message);
    });
    console.log(productDB);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      function showScrollY() {
        let yaxis = window.scrollY;
        setScroll(yaxis / 360);
      }

      window.addEventListener("scroll", (e) => {
        showScrollY();
      });
      return window.removeEventListener("scroll", showScrollY());
    }
  }, []);

  const Star = () => {
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

    for (let i = 0; i < Math.floor(productDB?.rate); i++) {
      arrY.push(starty);
    }
    for (let i = 0; i < 5 - Math.floor(productDB?.rate); i++) {
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
            <Star />
          </section>
        </header>
        <article className="message">
          <p className="p1"></p>
          <p className="p2"></p>
        </article>
      </div>
    );
  };
  const productDetails = useMemo(() => {
    return (
      <div className="itemDetails">
        <header
          className="root_header"
          style={{
            backgroundColor: "#fff",
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
            <Link
              to={"/"}
              style={{ textDecoration: "none", marginLeft: "10pt" }}
            >
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
              transition: "all 350ms ease-out ",
              transform: `scale(${scroll < 1 ? 1 - scroll : 0})`,
            }}
          >
            <div>
              <Slide
                autoplay={true}
                slidesToScroll={1}
                pauseOnHover={true}
                slidesToShow={1}
                arrows={false}
                easing={"ease"}
                indicators={true}
                transitionDuration={200}
                duration={2300}
              >
                <div
                  key={1}
                  style={{
                    width: "100vw",
                    maxWidth: "600px",
                    lineHeight: ".01rem",
                    margin: "10px auto",
                  }}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    src={productDB?.img ? productDB?.img : watch}
                    alt=""
                    width={"100%"}
                  />
                </div>
              </Slide>
            </div>
            <img src={productDB?.img ? productDB?.img : watch} alt="" />
          </section>
          <div className="details">
            <div className="flex-box-left">
              <section className="info">
                <h2 className="title">{productDB?.title} </h2>
                <h2 className="pro_id">
                  Product ID: <span> {productDB?.itemID}</span>
                </h2>
                {productDB?.rate ? (
                  <span className="rating">
                    <Star />
                    {productDB?.rate}
                    {"/5"}
                  </span>
                ) : (
                  <span className="rating">New</span>
                )}
                <p>
                  {productDB?.desc}
                  <span style={{ color: "blue" }}>more</span>
                </p>
              </section>
              {sizeArr.length !== 0 && (
                <section className="size">
                  <hr className="hr" />
                  <h3>size</h3>
                  <ul>
                    {sizeArr?.map((size, szid) => {
                      return <li key={szid}>{size}</li>;
                    })}
                  </ul>
                </section>
              )}
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
                  {formatMoneyIntoBDT(productDB?.taka)}
                </p>
                <article>
                  <button
                    className="btn btn-cart"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => addItem(productDB, productDB?.itemID)}
                  >
                    {JSON.parse(localStorage.getItem(cartRef))?.find(
                      (data) => data?.itemID == productDB?.itemID
                    )
                      ? "In the cart"
                      : "Add to cart"}
                    <img
                      style={{ filter: "invert(1)", marginLeft: "4pt" }}
                      src={shoppingcart}
                      alt=""
                    />
                  </button>
                  <Link
                    to={"/paymentconfirm"}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      className="btn btn-black btn-txt-white btn-buy "
                      onClick={() =>
                        addItem(productDB, productDB?.itemID, true)
                      }
                    >
                      Buy Now
                    </button>
                  </Link>
                </article>
              </section>
            </div>
            <div className="flex-box-right">
              <section className="review">
                <header className="review_root_head">
                  <h2>Review</h2>
                  {productDB?.rate && (
                    <span className="rating">
                      {starW}
                      {`${productDB?.rate}/5`}
                    </span>
                  )}
                </header>
                <hr />
                {<Review />}
                {<Review />}
              </section>
            </div>
          </div>
          {/* question and answer */}
          {currentUser && (
            <section className="que_ans">
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
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Type a question..."
                />
                <button className="btn btn-send" type="submit">
                  <img src={send} width={20} alt="" />
                </button>
              </section>
            </section>
          )}
        </div>
      </div>
    );
  }, [productDB, scroll, currentUser]);

  return <>{productDetails}</>;
}

export default ItemDetails;
