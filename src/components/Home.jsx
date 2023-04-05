// all components and datas
import React from "react";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import hotdeal from "../assets/hot_deals.png";
import Navbar from "./Navbar";
import { useSearchKey, useScreenSize } from "./Hooks/customHooks";
import { datas } from "../data/data";
import Items from "./Items";

//data for random image
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
      transitionDuration={700}
      duration={2300}
    >
      {slideShowTmp.map((element, id) => {
        return (
          <div
            key={id}
            className="each-slide-effect"
            style={{
              width: "90%",
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
  const { scroll, screenSize } = useScreenSize();
  const [searchkeyword, setsearchkeyword] = useSearchKey();
  const items = datas.filter((data) =>
    data.type.toLowerCase().includes(searchkeyword.toLowerCase())
  );

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
        <section>
          {items.length !== 0 ? (
            items.map((data, id) => {
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

export default Home;
