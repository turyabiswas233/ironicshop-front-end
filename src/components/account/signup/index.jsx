import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../../firebase";
import eye from "/src/assets/tools/icons/eyeslash.png";

function Signup() {
  const [userLoginInfo, setuserLoginInfo] = useState({
    email: "",
    pass: "",
  });
  const [showHide, setshowHide] = useState(false);
  function handlePasswordHider() {
    setshowHide(!showHide);
  }
  function createAccount(e) {
    e.preventDefault();
    if (userLoginInfo.email.length !== 0 && userLoginInfo.pass.length !== 0) {
      createUserWithEmailAndPassword(
        auth,
        userLoginInfo.email,
        userLoginInfo.pass
      ).then(() => {
        alert(auth.currentUser.email);
      });
    }
  }
  return (
    <div
      className="login"
      style={{
        padding: "2rem",
        margin: " 0 auto",
        maxWidth: "520px",
      }}
    >
      <h2 className="title">
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          iRonic Store
        </Link>
      </h2>
      <div className="login_details">
        <h3>Sign up </h3>
        <p style={{ color: "#525252", fontSize: ".75em" }}>
          Fill the form with your correct Email and a strong password
        </p>
        <br />
        <section
          style={{
            fontSize: ".825rem",
          }}
        >
          <ol start={1}>
            Benifits of having an account:
            <li>You can save your ordered details</li>
            <li>
              We can easily contact you if we need any further information
            </li>
          </ol>
        </section>
      </div>

      <div className="form">
        <form action="" onSubmit={createAccount}>
          <section
            className={`form_box ${
              userLoginInfo.email.includes("@") ? "email" : ""
            }`}
          >
            {/* email */}
            <label htmlFor="email">E-mail Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              required
              value={userLoginInfo.email}
              onChange={(e) =>
                setuserLoginInfo((pre) => ({ ...pre, email: e.target.value }))
              }
            />
          </section>

          <section
            className={`form_box ${
              userLoginInfo.pass.length == 8 ? "password" : ""
            }`}
          >
            {/* password */}
            <label htmlFor="password">Password</label>
            <input
              type={!showHide ? "password" : "text"}
              name="password"
              id="password"
              placeholder="use your password (8 character or more)"
              minLength={8}
              required
              value={userLoginInfo.pass}
              onChange={(e) =>
                setuserLoginInfo((pre) => ({ ...pre, pass: e.target.value }))
              }
            />
            <span className="pass_icon" onClick={handlePasswordHider}>
              <img src={eye} width={25} alt="" />
            </span>
            <span className={`pass_err ${showHide ? "show" : ""}`}>
              Please hide your password to continue
            </span>
          </section>
          <button className="btn btn-signup btn-buy " type="submit">
            Create Account
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            margin: "1rem auto",
            fontSize: "small",
          }}
        >
          Forget Password?{" "}
          <a href="#" style={{ color: "#253BFF" }}>
            Reset Password
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
