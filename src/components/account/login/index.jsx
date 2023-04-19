import React, { useState } from "react";
import { Link } from "react-router-dom";
import ff from "/src/assets/tools/icons/f.png";
import gg from "/src/assets/tools/icons/g.png";
import { auth } from "../../../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthContext } from "../../Hooks/firebase/AuthContext";

function Login() {
  const { currentUser } = useAuthContext();
  const [userLoginInfo, setuserLoginInfo] = useState({
    email: "",
    pass: "",
    user: currentUser,
  });

  const [showHide, setShowHide] = useState(false);
  const [load, setload] = useState(false);
  const Loading = () => {
    return <span>...</span>;
  };

  function getUserLoginInfo(em, pw) {
    setuserLoginInfo({ email: em, pass: pw });
  }
  function handlePasswordHider() {
    setShowHide(!showHide);
  }
  function handleLogin(e) {
    e.preventDefault();
    if (!showHide) {
      setload(true);
      signInWithEmailAndPassword(auth, userLoginInfo.email, userLoginInfo.pass)
        .then((user) => {
          setuserLoginInfo((pre) => ({ ...pre, user: user.user }));
          setload(false);
        })
        .catch((err) => {
          alert(
            err?.message?.includes("network-request-failed")
              ? "No internet connection"
              : err?.message?.includes("wrong-password")
              ? "Password Wrong!!"
              : err?.message
          );
          setload(false);
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
        <h3>Login </h3>
        <p style={{ color: "#525252", fontSize: ".75em" }}>
          Enter your email address & password you use to login in.
        </p>
      </div>

      {!currentUser ? (
        <div className="form">
          <form action="" onSubmit={handleLogin}>
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
                // required
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
            </section>
            <button className="btn btn-login " type="submit">
              {load ? <Loading /> : "Login"}
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
      ) : (
        <div>
          <h3 style={{ color: "red", textAlign: "center" }}>
            you are logged in as <br />{" "}
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
          </h3>
          <p>
            <button
              className="btn btn-bold btn-px-2 btn-red"
              onClick={() => signOut(auth)}
            >
              Logout
            </button>{" "}
          </p>
        </div>
      )}

      {!currentUser && (
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
      )}

      {!currentUser && (
        <div className="noAcc">
          <p
            style={{
              textAlign: "center",
              margin: "3rem auto 0",
              fontSize: "x-small",
            }}
          >
            Don’t have account?{" "}
            <a href="/account/signup" style={{ color: "#253BFF" }}>
              Create Account
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;

// 1234asdf
