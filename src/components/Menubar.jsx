import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./Hooks/firebase/AuthContext";
import { sendEmailVerification, signOut } from "firebase/auth";
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
  const AdminInteractBox = () => {
    if (currentUser?.displayName?.includes("admin"))
      return (
        <>
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#23cffa",
              padding: ".5rem 3rem",
              textAlign: "center",
              width: "70vh",
              maxWidth: "350px",
              color: "#112",
              fontWeight: "bold",
              letterSpacing: ".72pt",
              borderRadius: "0 0 .5rem .5rem ",
              borderBottom: "3pt solid black",
            }}
          >
            You are interacting as admin
          </div>
        </>
      );
  };
  const IsVerifiedBox = () => {
    if (currentUser && !currentUser?.emailVerified)
      return (
        <>
          <div
            style={{
              position: "absolute",
              bottom: "90px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#23cffa",
              padding: ".5rem 3rem",
              textAlign: "center",
              width: "70vh",
              maxWidth: "350px",
              color: "#112",
              fontWeight: "bold",
              letterSpacing: ".72pt",
              borderRadius: "0 0 .5rem .5rem ",
              borderBottom: "3pt solid black",
            }}
          >
            Your account is not verified
            <button
              className="btn btn-login"
              style={{
                backgroundColor: "#2323cd",
                padding: "5pt",
                borderRadius: "3pt",
                marginTop: ".8rem",
              }}
              onClick={() => {
                if (!currentUser?.emailVerified)
                  sendEmailVerification(currentUser).then(() =>
                    alert("Check your email")
                  );
                else {
                  alert("Already verified. Please refresh to update the page");
                }
              }}
            >
              verify now
            </button>
          </div>
        </>
      );
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
        <div>
          <AdminInteractBox />
          <IsVerifiedBox />
        </div>

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
