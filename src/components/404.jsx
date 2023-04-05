import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  const error_msg = {
    fontSize: "3rem",
    color: "#303040",
    textTransform: "uppercase",
    textAlign: "center",
  };
  const return_home = {
    fontSize: "2rem",
    color: "#2c2c5c",
    textTransform: "capitalize",
  };
  const return_home_link = {
    color: "#2c2c9e",
    cursor: "pointer",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h3 style={error_msg}>404 not found</h3>
      <p style={return_home}>
        return to{" "}
        <Link to={"/"} style={return_home_link}>
          Home
        </Link>
      </p>
    </div>
  );
}

export default ErrorPage;
