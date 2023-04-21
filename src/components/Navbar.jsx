import React, { useEffect, useState } from "react";
import { addToCart_LocalStorage } from "./Hooks/customHooks";
// icons
import hamburger from "../assets/tools/icons/Menu_icon.png";
import message from "../assets/tools/icons/message_icon.png";
import shopping from "../assets/tools/icons/shoppingcart.png";
import p2user from "../assets/tools/icons/profile2user.png";
import search from "../assets/tools/icons/search.png";
import { Link } from "react-router-dom";
import Menubar from "./Menubar";
import MessengerChat from "./MessengerChat";
function Navbar({ showSearch, searchKey, setSearchKey }) {
  const [menubar, setMenubar] = useState(false);
  const [num, setNum] = useState(0);
  const handleManubar = () => {
    setMenubar(!menubar);
  };
  const { lcoal_storage, cartRef } = addToCart_LocalStorage();
  useEffect(() => {
    setNum(JSON.parse(lcoal_storage.getItem(cartRef))?.length);
  }, [lcoal_storage.getItem(cartRef)]);
  return (
    <>
      <div className={`navbar `}>
        {/* top navbar */}
        <div className={`top  `}>
          <section className="left">
            <button
              className={`btn btn-basic btn-menubar  `}
              onClick={handleManubar}
            >
              <img src={hamburger} alt="" />
            </button>
            <h2 className="btn-txt-white btn-home">iRonic Store</h2>
          </section>
          <section className="right">
            {/* product location track  */}

            {/* checkout your cart  */}
            <Link to={"/yourcart"} title={"Checkout cart"}>
              <button className="btn btn-basic cart">
                <img src={shopping} alt="" />
                {num && <span className="number">{num}</span>}
              </button>
            </Link>
          </section>
        </div>
        {/* search box */}
        <div className={`search `}>
          <section className={`search-box `}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
              className="btn btn-cyan btn-search"
              style={{ color: "white" }}
              onClick={() => {
                setSearchKey("");
              }}
            >
              {!searchKey ? (
                <img src={search} alt="" width={20} height={20} />
              ) : (
                "x"
              )}
            </button>
          </section>
          <section className="p2user">
            <button className="btn btn-pink btn-circle">
              <img src={p2user} alt="" />
            </button>
          </section>
        </div>
        {/* nav catagory show */}
        <div className={`catagory `}>
          <ul>
            {tendingType.map((type, id) => {
              return (
                <li
                  key={id}
                  style={{
                    textTransform: "capitalize",
                  }}
                  className={`${type == searchKey ? "active" : "normal"}`}
                  onClick={() => setSearchKey(type)}
                >
                  {type}
                </li>
              );
            })}
          </ul>
        </div>
        <Menubar amountMenubar={menubar} onclick={handleManubar} />
      </div>
      <FIxedNavbar
        scroll={showSearch}
        hamburger={hamburger}
        handleManubar={handleManubar}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
      />
    </>
  );
}
const FIxedNavbar = ({
  scroll,
  handleManubar,
  hamburger,
  searchKey,
  setSearchKey,
}) => {
  return (
    <div className={`navbar ${scroll ? " fixed" : "nav-hidden"}`}>
      {/* top navbar */}
      <div className={`top ${scroll ? " fixed" : "nav-hidden"} `}>
        <section className="left">
          <button
            className={`btn btn-basic btn-menubar ${
              scroll ? " fixed" : "nav-hidden"
            }  `}
            onClick={handleManubar}
          >
            <img src={hamburger} alt="" />
          </button>
        </section>
      </div>
      {/* search box */}
      <div className={`search ${scroll ? " fixed" : "nav-hidden"}`}>
        <section className={`search-box ${scroll ? " fixed" : "nav-hidden"} `}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button
            className="btn btn-cyan btn-search"
            style={{ color: "white" }}
          >
            {!searchKey ? (
              <img src={search} alt="" width={20} height={20} />
            ) : (
              "x"
            )}
          </button>
        </section>
      </div>
    </div>
  );
};
const tendingType = ["watch", "shoe", "food", "pants"];
export default Navbar;
