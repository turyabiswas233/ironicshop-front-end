import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../../firebase";
import Loading from "../../Loading";

// react icons
import { MdPeopleAlt } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Signup() {
  const [userLoginInfo, setuserLoginInfo] = useState({
    email: "",
    pass: "",
  });
  const [isLoading, setloading] = useState(false);
  const [error, SetErr] = useState("");
  const [showHide, setshowHide] = useState(false);
  function handlePasswordHider() {
    setshowHide(!showHide);
  }
  async function createAccount(e) {
    e.preventDefault();
    setloading(true);
    if (userLoginInfo.email.length !== 0 && userLoginInfo.pass.length !== 0) {
      await createUserWithEmailAndPassword(
        auth,
        userLoginInfo.email,
        userLoginInfo.pass
      )
        .then((user) => {
          sendEmailVerification(user.user);
          alert(
            `Email verification has been sent to ${user.user.email} email.`
          );
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.log(err);
          err?.code?.includes("already-in-use")
            ? SetErr(
                "Someone has created account usign this email. Use another email."
              )
            : SetErr("Please try again.");
          alert(error);
        });
    } else {
      setloading(false);
      SetErr("Please complete the form to continue!");
    }
  }
  const accountError = useMemo(() => {
    <p> frf{error}</p>;
  }, [error]);
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
      {accountError}
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
              userLoginInfo.email
                ? userLoginInfo.email.includes("@") &&
                  userLoginInfo.email[userLoginInfo.email.length - 1] !== "@"
                  ? "active"
                  : "danger"
                : ""
            }`}
          >
            {/* email */}
            <label htmlFor="email">E-mail Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              value={userLoginInfo.email}
              onChange={(e) =>
                setuserLoginInfo((pre) => ({ ...pre, email: e.target.value }))
              }
            />
          </section>

          <section
            className={`form_box ${
              userLoginInfo.pass
                ? userLoginInfo.pass.length >= 8
                  ? "active"
                  : "danger"
                : ""
            }`}
          >
            {/* password */}
            <label htmlFor="password">Password</label>
            <input
              type={!showHide ? "password" : "text"}
              name="password"
              id="password"
              placeholder="password (8 character or more)"
              minLength={8}
              value={userLoginInfo.pass}
              onChange={(e) =>
                setuserLoginInfo((pre) => ({ ...pre, pass: e.target.value }))
              }
            />
            <span className="pass_icon" onClick={handlePasswordHider}>
              {showHide ? (
                <AiOutlineEye size={"1.5rem"} color="royalblue" />
              ) : (
                <AiOutlineEyeInvisible size={"1.5rem"} color="crimson" />
              )}
            </span>
            <span className={`pass_err ${showHide ? "show" : ""}`}>
              Please hide your password to continue
            </span>
          </section>
          <button
            className="btn btn-signup btn-buy "
            style={{ gap: "5px" }}
            type="submit"
          >
            {isLoading ? (
              <Loading size={1.2} />
            ) : (
              <>
                Create Account <MdPeopleAlt />
              </>
            )}
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            margin: "1rem auto",
            fontSize: "small",
          }}
        >
          Have an account?{" "}
          <a href="/account/login" style={{ color: "#253BFF" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
