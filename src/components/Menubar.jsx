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
    width: amountMenubar ? "75vw" : "0vw",
    maxWidth: "500px",
    height: "100vh",
    overflowY: "hidden",
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
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Menubar</h3>
        <li>
          <Link to={"/admin"} style={{ textDecoration: "none" }}>
            <button
              className="btn btn-black"
              style={{
                textTransform: "uppercase",
              }}
            >
              Admin
            </button>
          </Link>
        </li>
        <li>
          <Link to={"/account/login"} style={{ textDecoration: "none" }}>
            <button
              className="btn btn-black"
              style={{
                textTransform: "uppercase",
              }}
            >
              login | logout
            </button>
          </Link>
        </li>
      </ul>
      <Link to={"/account/login"} style={{ textDecoration: "none" }}>
        <button
          className="btn btn-black"
          style={{
            textTransform: "uppercase",
            marginTop: "50%",
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
