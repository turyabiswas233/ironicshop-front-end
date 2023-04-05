import React from "react";

function Footer({ id }) {
  if (!id)
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
          minHeight: "300px",
        }}
      >
        Footer
      </div>
    );
}

export default Footer;
