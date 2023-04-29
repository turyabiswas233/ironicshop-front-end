import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillCheckCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import ff from "/src/assets/tools/icons/f.png";
import gg from "/src/assets/tools/icons/g.png";
import { auth } from "../../../../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useAuthContext } from "../../Hooks/firebase/AuthContext";
import Loading from "../../Loading";

// login function for faccebook
export const useFbSingIn = () => {
  const provider = new FacebookAuthProvider();
  const [user, setuser] = useState(null);
  auth.languageCode = "it";
  provider.setCustomParameters({
    display: "popup",
  });
  function singupWithFB() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // curent user
        const rs_user = result.user;
        setuser(rs_user);
        f;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;

        // do something on error
        console.log(errorCode, errorMessage);
      });
  }
  return { user, singupWithFB };
};

// main function
function Login() {
  const { currentUser } = useAuthContext();
  const [userLoginInfo, setuserLoginInfo] = useState({
    email: "",
    pass: "",
    user: currentUser,
  });

  const [showHide, setShowHide] = useState(false);
  const [resetSend, setResetSend] = useState(false);
  const [load, setload] = useState(false);

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
  // reset pass handler
  function handleResetPass(e) {
    e.preventDefault();
    if (userLoginInfo.email) {
      sendPasswordResetEmail(auth, userLoginInfo.email)
        .then(() => {
          setResetSend(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Enter your Email");
    }
  }
  return (
    <div
      className="login"
      style={{
        padding: "2rem",
        margin: " 0 auto",
        maxWidth: "820px",
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
      <section className="flex-box">
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
                  {showHide ? (
                    <AiOutlineEye size={"1.5rem"} />
                  ) : (
                    <AiOutlineEyeInvisible size={"1.5rem"} />
                  )}
                </span>
                <span className={`pass_err ${showHide ? "show" : ""}`}>
                  Please hide your password to login
                </span>
              </section>
              <button className="btn btn-login " type="submit">
                {load ? <Loading size={1.2} /> : "Login"}
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
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#253BFF",
                }}
                onClick={handleResetPass}
              >
                Reset Password
              </span>
            </p>
            {resetSend && (
              <section className="passReset">
                <p>
                  Passwrod reset email sent!{" "}
                  <AiFillCheckCircle fill="#5adc47" size={"1.05rem"} />
                </p>
              </section>
            )}
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
          <div>
            {/* <div className="otherSys">
              <button className="singup google">
                <img src={gg} width={25} alt="google" />
                <p>Sign in with Google</p>
              </button>
              <button className="singup google" onClick={singupWithFB}>
                <img src={ff} width={25} alt="facebook" />

                <p>Sign in with Facebook</p>
              </button>
            </div> */}

            <div className="noAcc">
              <p
                style={{
                  textAlign: "center",
                  margin: "3rem auto 0",
                  fontSize: "small",
                }}
              >
                Don’t have account?{" "}
                <a href="/account/signup" style={{ color: "#253BFF" }}>
                  Create Account
                </a>
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Login;
