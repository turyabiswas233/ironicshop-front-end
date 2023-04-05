import React, { useState } from "react";

// icons
import hamburger from "../assets/tools/icons/Menu_icon.png";
import message from "../assets/tools/icons/message_icon.png";
import shopping from "../assets/tools/icons/shoppingcart.png";
import p2user from "../assets/tools/icons/profile2user.png";
import search from "../assets/tools/icons/search.png";
import { Link } from "react-router-dom";
import Menubar from "./Menubar";
function Navbar({ showSearch, searchKey, setSearchKey }) {
  const [menubar, setMenubar] = useState(false);
  const handleManubar = () => {
    setMenubar(!menubar);
  };
  return (
    <div className={`navbar ${showSearch ? "fixed" : ""}`}>
      {/* top navbar */}
      <div className={`top ${showSearch ? "fixed" : ""}`}>
        <section className="left">
          <button
            className={`btn btn-basic btn-menubar ${showSearch ? "fixed" : ""}`}
            onClick={handleManubar}
          >
            <img src={hamburger} alt="" />
          </button>
          <button className="btn btn-basic btn-txt-white btn-home">
            iRonic Store
          </button>
        </section>
        <section className="right">
          {/* product location track  */}

          {/* chat with delivery man */}
          <Link to={"/chat"}>
            <button className="btn btn-basic">
              <img src={message} alt="" />
            </button>
          </Link>
          {/* checkout your cart  */}
          <Link to={"/yourcart"} title={"Checkout cart"}>
            <button className="btn btn-basic">
              <img src={shopping} alt="" />
            </button>
          </Link>
        </section>
      </div>
      {/* search box */}
      <div className={`search ${showSearch ? "fixed" : ""}`}>
        <section className={`search-box ${showSearch ? "fixed" : ""}`}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="btn btn-cyan btn-search">
            <img src={search} alt="" width={20} height={20} />
          </button>
        </section>
        <section className="p2user">
          <button className="btn btn-pink btn-circle">
            <img src={p2user} alt="" />
          </button>
        </section>
      </div>
      {/* nav catagory show */}
      <div className={`catagory ${showSearch ? "fixed" : ""}`}>
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
  );
}
const tendingType = ["watch", "shoe", "food", "pants"];
export default Navbar;
