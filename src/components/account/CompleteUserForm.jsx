import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/firebase/AuthContext";
import { signOut, updateProfile } from "firebase/auth";
import { auth, fdb } from "../../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
// styles components and icons
import Loading from "../Loading";
import { IoMdCheckmarkCircle } from "react-icons/io";

// main function
function CompleteUserForm() {
  const { currentUser } = useAuthContext();
  const [isLoading, setloading] = useState(false);
  const [userLoginInfo, setuserLoginInfo] = useState({
    fullname: "",
    phnumber: "",
    address: "",
  });
  function logoutMe() {
    signOut(auth);
  }
  function checkBDPhoneValidity() {
    if (userLoginInfo.phnumber.startsWith("01")) {
      return true;
    } else return false;
  }
  async function handleCreateProfile(e) {
    e.preventDefault();
    if (!auth.currentUser.emailVerified) return;
    else {
      setloading(true);
      if (checkBDPhoneValidity) {
        await setDoc(doc(fdb, "users", currentUser.uid), {
          id: currentUser.uid,
          f_name: userLoginInfo.fullname,
          p_num: "+88" + userLoginInfo.phnumber,
          address: userLoginInfo.address,
          email: currentUser.email,
          timestamp: serverTimestamp(),
          admin: false,
        })
          .then(async () => {
            await updateProfile(currentUser, {
              displayName: userLoginInfo.fullname,
            })
              .then(() => {
                setloading(false);
                window.location.reload();
              })
              .catch((err) => {
                setloading(false);
                alert("Failed to updated profile");
              });
          })
          .catch((err) => {
            alert("Unfortunately there was an error, try again!");
          });
      } else {
        setloading(false);
        alert("Check your phone number");
      }
    }
  }
  const EmailVerifyAlert = () => {
    if (!auth.currentUser.emailVerified)
      return (
        <>
          <div className="emailVerifyAlert">
            <p>
              Please verify your email to continue
              <IoMdCheckmarkCircle />
            </p>
            <p>
              Check your <u>{auth.currentUser.email}</u>
              email.
            </p>
          </div>
        </>
      );
  };
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
      {<EmailVerifyAlert />}
      <button className="btn btn-logout" onClick={logoutMe}>
        Logout
      </button>
      <div className="login_details">
        <h3>Complete your profile</h3>
        <p style={{ color: "#525252", fontSize: ".75em" }}>
          Fill the form with your correct information
        </p>
      </div>
      {currentUser && !currentUser.displayname && (
        <div className="form">
          <form onSubmit={handleCreateProfile}>
            <section
              className={`form_box ${
                userLoginInfo.fullname.length == 0 ? "" : "perfect"
              }`}
            >
              {/* email */}
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Full Name"
                required
                value={userLoginInfo.fullname}
                onChange={(e) =>
                  setuserLoginInfo((pre) => ({
                    ...pre,
                    fullname: e.target.value,
                  }))
                }
              />
            </section>

            <section
              className={`form_box ${
                userLoginInfo.phnumber.length == 0 ||
                userLoginInfo.phnumber.length !== 11
                  ? ""
                  : "perfect"
              }`}
            >
              {/* password */}
              <label htmlFor="phnumber">Phone Number</label>
              <input
                type={"text"}
                name="phnumber"
                id="phnumber"
                placeholder="Phone Number(017xxxxxxxx)"
                minLength={11}
                maxLength={11}
                required
                value={userLoginInfo.phnumber}
                onChange={(e) =>
                  setuserLoginInfo((pre) => ({
                    ...pre,
                    phnumber: e.target.value,
                  }))
                }
              />
            </section>
            <section
              className={`form_box ${
                userLoginInfo.address.length == 0 ||
                userLoginInfo.address.startsWith(" ", 0)
                  ? ""
                  : "perfect"
              }`}
            >
              <label htmlFor="address">Address</label>
              <textarea
                style={{ resize: "none", height: "80px" }}
                placeholder={`Shipping Address\nProducts will also be delivered here\nYou can update it later if required`}
                type="text"
                name="name"
                id="name"
                required
                value={userLoginInfo.address}
                onChange={(e) =>
                  setuserLoginInfo((pre) => ({
                    ...pre,
                    address: e.target.value,
                  }))
                }
              />
            </section>
            <button
              className="btn  btn-circle btn-px-2 btn-bold btn-cyan"
              type="submit"
              // disabled={!auth.currentUser.emailVerified}
            >
              {isLoading ? <Loading size={1} /> : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CompleteUserForm;
