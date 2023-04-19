import React from "react";
import { getLoginRoute } from "./Hooks/customHooks";

function Footer() {
  const { isInLoginPage } = getLoginRoute();
  if (!isInLoginPage)
    return (
      <div
        style={{
          backgroundColor: "#223",
          color: "white",
          padding: "30px",
          fontSize: "2.5rem",
          fontWeight: "700",
          width: "100%",
          position: "absolute",
          left: "0",
          top: "100%",
          minHeight: "300px",
        }}
      >
        Footer
      </div>
    );
}

export default Footer;
