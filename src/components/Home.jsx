// all components and datas
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import hotdeal from "../assets/hot_deals.png";
import Navbar from "./Navbar";
import { useSearchKey, useScreenSize } from "./Hooks/customHooks";
import { useLimitData } from "../data/data";
import Items from "./Items";
import "../styles/sorter.css";
import { useAuthContext } from "./Hooks/firebase/AuthContext";
import Loading from "./Loading";
import { useQuery, useQueryClient } from "react-query";

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
export const queryKey = "allProList";
export const getDataQuery = () => {
  const { data, isLoading, error } = useQuery(queryKey, useLimitData);
  return { data, isLoading, error };
};
// main function
function Home() {
  const { currenUser } = useAuthContext();
  const { data, isLoading, error } = getDataQuery();
  let data1;
  const qrClient = useQueryClient();
  const callback = () => {
    data1 = qrClient.getQueryData(queryKey);
  };
  useEffect(() => {
    callback();
  }, [isLoading]);
  const { scroll } = useScreenSize();
  const [searchkeyword, setsearchkeyword] = useSearchKey();
  const items = data1
    ? data1?.filter((data) =>
        data1?.type?.toLowerCase()?.includes(searchkeyword?.toLowerCase())
      )
    : data?.filter((data) =>
        data?.type?.toLowerCase()?.includes(searchkeyword?.toLowerCase())
      );
  const LoadingData = () => {
    if (isLoading) return <Loading size={5} />;
  };

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
        <h1>Trending Now {currenUser?.email}</h1>
        {items?.length !== 0 && (
          <button className="btn btn-basic btn-m-0">See all</button>
        )}
        <LoadingData />
        <section>
          {items?.length !== 0 ? (
            items?.map((data, id) => {
              return <Items key={id} props={data} id={data.id} />;
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
