import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/firebase/AuthContext";
import { signOut, updateProfile } from "firebase/auth";
import { auth, fdb } from "../../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function CompleteUserForm() {
  const { currentUser } = useAuthContext();
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
              alert("Yahoo!!");
              window.location.reload();
            })
            .catch((err) => {
              alert("Failed to updated profile");
            });
        })
        .catch((err) => {
          alert("Unfortunately there was an error, try again!");
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
      <button className="btn btn-red" onClick={logoutMe}>
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
            <button className="btn  btn-pink btn-bold " type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CompleteUserForm;
