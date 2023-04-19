import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./Hooks/firebase/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
function Menubar({ amountMenubar, onclick }) {
  const { currentUser } = useAuthContext();
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
      <h2>
        {currentUser
          ? currentUser?.displayName
            ? currentUser?.displayName
            : currentUser?.email
          : ""}
      </h2>
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
          {currentUser?.displayName?.includes("admin") && (
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
          )}
        </li>
        <li>
          <button
            className="btn btn-black"
            style={{
              textTransform: "uppercase",
            }}
            onClick={() => {
              signOut(auth);
            }}
          >
            {!currentUser && (
              <Link
                to={"/account/login"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            )}
            {currentUser ? "Logout" : ""}
          </button>
        </li>
      </ul>
      {/* <Link to={"/account/login"} style={{ textDecoration: "none" }}>
        <button
          className="btn btn-black"
          style={{
            textTransform: "uppercase",
            marginTop: "50%",
          }}
        >
          login | logout
        </button>
      </Link> */}
      <button className=" btn btn-cross" onClick={onclick}>
        x
      </button>
    </div>
  );
}

export default Menubar;
