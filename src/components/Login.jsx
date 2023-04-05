import React, { useState } from "react";
import { Link } from "react-router-dom";
import ff from "/src/assets/tools/icons/f.png";
import gg from "/src/assets/tools/icons/g.png";

function Login() {
  const [userLoginInfo, setuserLoginInfo] = useState({
    email: "",
    pass: "",
  });
  const [showHide, setShowHide] = useState(false);

  function getUserLoginInfo(em, pw) {
    setuserLoginInfo({ email: em, pass: pw });
  }
  function handlePasswordHider() {
    setShowHide(!showHide);
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
        <h3>Login</h3>
        <p style={{ color: "#525252", fontSize: ".75em" }}>
          Enter your email address & password you use to login in.
        </p>
      </div>

      <div className="form">
        <form action="" onSubmit={(e) => e.preventDefault()}>
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
                getUserLoginInfo(e.target.value, userLoginInfo.pass)
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
                getUserLoginInfo(userLoginInfo.email, e.target.value)
              }
            />
            <span className="pass_icon" onClick={handlePasswordHider}>
              <img
                src={"/src/assets/tools/icons/eyeslash.png"}
                width={25}
                alt=""
              />
            </span>
            <span className={`pass_err ${showHide ? "show" : ""}`}>
              Please hide your password to login
            </span>
            <ul className="password_tips">
              <b>
                Make sure you remeber your password. Here is some tips to make
                your password strong
              </b>
              <li>Use Alphabates both in Capital and Small case</li>
              <li>Use Numeric key</li>
              <li>Don&rsquo;t use your personal name or number</li>
            </ul>
          </section>
          <button className="btn btn-login " type="submit">
            Login
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

      <div className="otherSys">
        <section className="singup google">
          <img src={gg} width={25} alt="google" />
          <p>Sign Up with Google</p>
        </section>
        <section className="singup google">
          <img src={ff} width={25} alt="facebook" />

          <p>Sign Up with Facebook</p>
        </section>
      </div>

      <div className="noAcc">
        <p
          style={{
            textAlign: "center",
            margin: "3rem auto 0",
            fontSize: "x-small",
          }}
        >
          Don’t have account?{" "}
          <a href="#" style={{ color: "#253BFF" }}>
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
