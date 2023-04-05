import React from "react";
import { Link } from "react-router-dom";
import { useScreenSize } from "./Hooks/customHooks";

function Menubar({ amountMenubar, onclick }) {
  const { screenSize } = useScreenSize();
  const styles = {
    position: "fixed",
    left: amountMenubar ? "0" : "-50vw",
    top: "0",
    background: "purple",
    width: amountMenubar ? (screenSize.width < 786 ? "75vw" : "500px") : "0vw",
    height: "100vh",
    overflowY: "scroll",
    padding: "20pt",
    zIndex: "100",
    boxShadow: "0 0 10px purple",
    color: "white",
    transition: "all 0.4s ease-in-out",
    opacity: amountMenubar ? "1" : "0.2",
  };
  return (
    <div style={styles}>
      <h2>User name</h2>
      <Link to={"/account/login"} style={{ textDecoration: "none" }}>
        <button
          className="btn btn-black"
          style={{
            margin: "50vh auto 0",
            textTransform: "uppercase",
          }}
        >
          login | logout
        </button>
      </Link>
      <button className=" btn btn-cross" onClick={onclick}>
        x
      </button>
    </div>
  );
}

export default Menubar;
