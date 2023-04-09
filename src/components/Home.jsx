// all components and datas
import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import hotdeal from "../assets/hot_deals.png";
import Navbar from "./Navbar";
import { useSearchKey, useScreenSize } from "./Hooks/customHooks";
import { datas } from "../data/data";
import Items from "./Items";
import "../styles/sorter.css";
import arrow from "/src/assets/tools/icons/arrowleft.png";

//data for random image
const sortByPrice = ["lowp", "highp"];
const sortByName = ["lown", "highn"];

const slideShowTmp = [
  {
    title: "slide 1",
    bgCol: "red",
    info: "lorem Ipsum iojfwef ji foisaej fwi ooiweajrf iwajrp jsufh iojf shj jsoi",
  },
  {
    title: "slide 2",
    bgCol: "cyan",
    info: "lorem Ipsum iojfwef ji foisaej fwi ooiweajrf iwajrp jsufh iojf shj jsoi",
  },
  {
    title: "slide 3",
    bgCol: "blue",
    info: "lorem Ipsum iojfwef ji foisaej fwi ooiweajrf iwajrp jsufh iojf shj jsoi",
  },
  {
    title: "slide 4",
    bgCol: "pink",
    info: "lorem Ipsum iojfwef ji foisaej fwi ooiweajrf iwajrp jsufh iojf shj jsoi",
  },
  {
    title: "slide 5",
    bgCol: "violet",
    info: "lorem Ipsum iojfwef ji foisaej fwi ooiweajrf iwajrp jsufh iojf shj jsoi",
  },
];

//slider
const Slideshow = () => {
  return (
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
      {slideShowTmp.map((element, id) => {
        return (
          <div
            key={id}
            style={{
              width: "100vw",
              maxWidth: "600px",
              lineHeight: ".01rem",
              margin: "10px auto",
            }}
          >
            <Link to={`/offer/${id}`}>
              <img
                style={{ cursor: "pointer" }}
                src={hotdeal}
                alt=""
                width={"100%"}
              />
            </Link>
            <h2>{element.title}</h2>
          </div>
        );
      })}
    </Slide>
  );
};

// main function
function Home() {
  const { scroll } = useScreenSize();
  const [searchkeyword, setsearchkeyword] = useSearchKey();
  const items = datas.filter((data) =>
    data.type.toLowerCase().includes(searchkeyword.toLowerCase())
  );
  const [priceState, sortPatch] = useReducer(reducer, {
    sort: sortByPrice[0],
    cata: "price",
  });

  function reducer(state, action) {
    switch (action.type) {
      case action.payload:
        return { sort: action.payload, catagory: action.cata };
      default:
        return state;
    }
  }
  const find_sortingID = (value) => value;
  const [sortingID, setSortingID] = useState(find_sortingID(priceState.sort));
  const [hidden, setHidden] = useState(true);
  return (
    <div
      className="Home"
      style={{
        padding: "10px",
      }}
    >
      <Navbar
        showSearch={scroll}
        searchKey={searchkeyword}
        setSearchKey={setsearchkeyword}
      />
      {/* hot offers */}
      <div className="hot_off">
        {searchkeyword.length == 0 && <Slideshow />}
      </div>
      {/* trending products */}
      <div className="trends">
        <h1>Trending Now</h1>
        <article
          style={{
            display: "flex",
            margin: "0 auto",
            width: "fit-content",
            gap: "10pt",
          }}
        >
          {/* price sorter */}
          <div className="sorter">
            <p>Sort by: Price</p>
            <span className="absolute_sort" onClick={() => setHidden(!hidden)}>
              {priceState.sort.slice(0, -1)} in {priceState.catagory}
              <img
                id={`${hidden ? "hidden" : "show"}`}
                width={25}
                src={arrow}
                alt="arrow"
              />
            </span>
            <ul
              style={{
                height: hidden ? "0pt" : "100pt",
              }}
            >
              {sortByPrice.map((sbp) => {
                return (
                  <li key={sbp}>
                    <button
                      className={`${sortingID == sbp ? "active" : ""} normal`}
                      value={sbp}
                      onClick={() => {
                        if (sbp !== priceState.sort) {
                          sortPatch({ type: sbp, payload: sbp, cata: "price" });
                          setSortingID(find_sortingID(sbp));
                          setHidden(true);
                        }
                      }}
                    >
                      {sbp.slice(0, -1)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* rate sorter */}
          <div className="sorter">
            <p>Sort by: Rating</p>
            <ul
              style={{
                height: hidden ? "0pt" : "100pt",
              }}
            >
              {sortByName.map((sbr) => {
                return (
                  <li key={sbr}>
                    <button
                      className={`${sortingID == sbr ? "active" : "normal"}`}
                      value={sbr}
                      onClick={() => {
                        if (sbr !== priceState) {
                          sortPatch({
                            type: sbr,
                            payload: sbr,
                            cata: "rating",
                          });

                          setSortingID(find_sortingID(sbr));
                          setHidden(true);
                        }
                      }}
                    >
                      {sbr.slice(0, -1)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </article>

        <section>
          {items.length !== 0 ? (
            items
              .sort(
                priceState == "lowp"
                  ? sortByLowPrice
                  : priceState == "highp"
                  ? sortByHighPrice
                  : priceState == "lown"
                  ? sortByLowName
                  : priceState == "highn"
                  ? sortByHighName
                  : () => {}
              )
              .map((data, id) => {
                return <Items key={id} props={data} itemId={data.itemID} />;
              })
          ) : (
            <>
              <h3 className="error">No data to show</h3>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function sortByLowPrice(a, b) {
  return a.taka - b.taka;
}

function sortByHighPrice(a, b) {
  return b.taka - a.taka;
}

function sortByLowName(a, b) {
  return a.rate - b.rate;
}

function sortByHighName(a, b) {
  return b.rate - a.rate;
}
export default Home;
