import React, { useEffect, useReducer, useState } from "react";
import "../../styles/admin.css";
import watch from "../../assets/watch.png";
import menuicon from "../../assets/tools/icons/Menu_icon.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/firebase/AuthContext";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, fdb } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useUserContext } from "../Hooks/firebase/UserContext";
import { useLimitData } from "../../data/data";
import { formatMoneyIntoBDT } from "../Hooks/customHooks";
// react icons
import { MdNotificationsActive } from "react-icons/md";

// main component
function Admin() {
  const { currentUser } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, adminNavOptions[0]);
  const [closeNav, setcloseNav] = useState(false);
  const [popUp, setpopUp] = useState(false);

  // functions
  function handlePopUP() {
    setpopUp(!popUp);
  }
  function handleCloseNav() {
    setcloseNav(!closeNav);
  }
  function reducer(state, action) {
    switch (action?.type) {
      case action?.payload:
        return action?.payload;

      default:
        state;
    }
  }
  const { curUser } = useUserContext();

  const [orders, setOrders] = useState([]);
  async function getOrders() {
    const orderRef = query(collection(fdb, "orders"));
    const snapOrder = await getDocs(orderRef);
    setOrders([]);
    snapOrder.forEach((doc) =>
      setOrders((pre) => [...pre, { id: doc.id, ...doc.data() }])
    );
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="admin_root">
      <AdminTopbar
        currentUser={currentUser}
        orders={orders}
        handleCloseNav={handleCloseNav}
      />
      <div
        style={{
          display: "flex",
          height: "calc(100% - 4rem)",
        }}
      >
        <AdminNavbar
          state={state}
          onclick={dispatch}
          handleCloseNav={handleCloseNav}
          closeNav={closeNav}
          handlePopUP={handlePopUP}
        />
        <AdminRouteBox
          routeName={state}
          user={currentUser}
          userInfo={curUser}
          orders={orders}
        />
      </div>
    </div>
  );
}

// top bar
const AdminTopbar = ({ currentUser, handleCloseNav, orders }) => {
  return (
    <header>
      <div className="adminTopbar">
        <h2 style={{ display: "flex", alignItems: "center" }}>
          <span
            className="hid-menu"
            style={{
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={handleCloseNav}
          >
            <img
              style={{ filter: "invert(1)" }}
              src={menuicon}
              width={25}
              height={25}
              alt="menu"
            />
          </span>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <span className="logo">iRonic Store</span>
          </Link>
        </h2>
        <ul>
          <li>
            <MdNotificationsActive />
            <span style={{ color: "red" }}>
              {orders.length !== 0 && orders?.length}
            </span>
          </li>
          <li>
            {currentUser && currentUser?.displayName
              ? currentUser?.displayName
              : "Account"}
          </li>
        </ul>
      </div>
    </header>
  );
};

// ;left navbar
const AdminNavbar = ({ state, onclick, handleCloseNav, closeNav }) => {
  return (
    <div className={`adminNavbar ${closeNav ? "active" : ""}`}>
      <button className="crossNav" onClick={handleCloseNav}>
        x
      </button>
      <button
        className="btn btn-black btn-bold btn-p-1"
        onClick={() => {
          onclick({ type: "addProduct", payload: "addProduct" });

          handleCloseNav();
        }}
      >
        Add product
      </button>
      <div>
        <ul>
          {adminNavOptions.map((ele, id) => {
            return (
              <li
                className={` ${ele == state ? "bg-white" : ""}`}
                key={id}
                onClick={() => {
                  onclick({ type: ele, payload: ele });
                  handleCloseNav();
                }}
              >
                {ele}
              </li>
            );
          })}
        </ul>
        <button
          className="btn btn-logout btn-bold btn-p-1"
          onClick={() => signOut(auth).then(() => window.location.reload())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
const adminNavOptions = ["dashboard", "products", "users", "ads"];
export default Admin;

// admin route to each section

const AdminRouteBox = ({ routeName, user, userInfo, orders }) => {
  const { users } = useUserContext();

  return (
    <div className="adminRouteBox">
      {userInfo.admin == true ? (
        <>
          <h1 className="routeName">{routeName}</h1>
          {routeName == "dashboard" && <Dashboard orders={orders} />}
          {routeName == "products" && <Products />}
          {routeName == "sells list" && <Sells />}
          {routeName == "users" && <Users users={users} />}
          {routeName == "ads" && <Ads />}
          {routeName == "addProduct" && <PopUpCard />}
        </>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>Request for Admin Panel</h2>
          <br />
          <AdminRequest user={user} />
        </>
      )}
    </div>
  );
};

// Dashboard
const Dashboard = ({ orders }) => {
  return (
    <div className="dashboard">
      {orders
        ?.sort((a, b) => {
          return a.taka - b.taka;
        })
        ?.map((product, id) => {
          return (
            <div className="root" key={id}>
              <div>
                <p>
                  Name: <b>{product.cust_name}</b>
                </p>
                <p>
                  Phone: <b>{product.cust_phone}</b>
                </p>
                <p>
                  Email: <b>{product.cust_email}</b>
                </p>
                <p>
                  Address: <b>{product.cust_add}</b>
                </p>
                <p>
                  Total Price:{" "}
                  <b>{formatMoneyIntoBDT(product.totalPrice + 100)} TK </b>
                </p>
              </div>
              <div className="order">
                <h3 style={{ fontWeight: "bold" }}>Order</h3>
                <section colSpan={4}>
                  <ol>
                    {orders[id]?.orderdItems[0]?.newData?.map((data, id1) => {
                      return (
                        <li style={{ marginLeft: "15px" }} key={id1}>
                          {data?.title} {"(x"} {data?.quantity}
                          {")"} : {formatMoneyIntoBDT(data.taka)} tk
                        </li>
                      );
                    })}
                  </ol>
                </section>
                <button
                  className="btn"
                  style={{ backgroundColor: "#32ef3c", margin: ".5rem auto" }}
                >
                  Confirm
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// Products
const Products = () => {
  const { limitdatas, getLimitProducts } = useLimitData();
  useEffect(() => {
    let oldData = JSON.parse(localStorage.getItem("allProd"));

    getLimitProducts(oldData).then(() => {
      localStorage.setItem(
        "allProd",
        JSON.stringify({ time: new Date().getTime(), list: limitdatas })
      );
    });
  }, []);
  return (
    <div className="products-box">
      <table cellSpacing={0}>
        <thead>
          <tr className="header">
            <th>#</th>
            <th>Name</th>
            <th>Product ID</th>
            <th>Sold</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Mark As</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {limitdatas
            ?.sort((a, b) => {
              return a.taka - b.taka;
            })
            ?.map((product, id) => {
              return (
                <tr key={id}>
                  <td>
                    {product.img ? (
                      <img className="w-50" src={product.img} alt="profile" />
                    ) : (
                      "null"
                    )}
                  </td>

                  <td>{product.title}</td>
                  <td>{product.itemID}</td>
                  <td>{product.sold || 0}</td>
                  <td>{product.rating || 0}</td>
                  <td>{formatMoneyIntoBDT(product.taka)} tk</td>

                  <td>
                    <button
                      className="btn btn-txt-white round-full  "
                      style={{
                        fontSize: "1rem",
                        backgroundColor: product.isStock ? "green" : "cyan",
                      }}
                    >
                      {product.isStock ? "in-stock" : "out-of-stock"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-delete btn-txt-white  round-full"
                      style={{ fontSize: "1rem" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

// users
const Users = ({ users }) => {
  return (
    <div className="users-box">
      <table cellSpacing={0}>
        <thead>
          <tr className="header">
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>

            <th>Address</th>
            <th>Block</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <img className="w-50" src={watch} alt="profile" />
                </td>

                <td className="username">{user.f_name}</td>
                <td>{user.p_num}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>

                <td>
                  <button className="btn btn-cyan btn-txt-white  round-full btn-px-2 ">
                    Block
                  </button>
                </td>
                <td>
                  <button className="btn btn-delete btn-txt-white  round-full btn-px-2 ">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Ads
const Ads = () => {
  return <div>Ads</div>;
};

const AdminRequest = ({ user }) => {
  const [admin, setAdmin] = useState({
    adminEmail: "",
  });
  return (
    <>
      <div>
        <form
          className="admin_form"
          style={{
            border: "1px solid orange",
            width: "90%",
            margin: "0 auto",
            padding: "10px",
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (user)
              await setDoc(doc(fdb, "adminReq", user?.uid), {
                reqEmail: admin.adminEmail,
                reqTime: serverTimestamp(),
                reqUID: user?.uid,
              })
                .then(() => {
                  alert("Your request for ADMIN PANEL has been sent reached.");
                })
                .catch((err) => {
                  alert("Sorry, you are not permitted to send us request");
                });
            else {
              alert("Sorry, you are not permitted to send us request");
            }
          }}
        >
          <section className="admin_box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              value={admin.adminEmail}
              onChange={(e) =>
                setAdmin((pre) => ({ ...pre, adminEmail: e.target.value }))
              }
              name="email"
              id="email"
            />
          </section>
          <button
            className=" btn-req "
            disabled={admin.adminEmail !== user?.email}
            type="submit"
          >
            Request
          </button>
        </form>
      </div>
    </>
  );
};

// popup for add a item
const PopUpCard = () => {
  // items info
  const [title, settitle] = useState("");
  const [brand, setbrand] = useState("");
  const [size, setsize] = useState("");
  const [sizeArr, setSizeArr] = useState([]);
  const [taka, settaka] = useState("");
  const [color, setcolor] = useState("");
  const [descript, setdescript] = useState("");
  const [type, settype] = useState("choose a category");
  const [load, setload] = useState(false);
  const [itemID, setItemID] = useState("");
  const [error, setErr] = useState("");
  const [showCata, setcata] = useState(false);
  const catArr = ["monitor", "mobile", "pant", "t-shirt", "bag", "sunglass"];

  const Spinner = () => {
    return (
      <>
        <span>Loading...</span>
      </>
    );
  };
  useEffect(() => {
    if (title == "") setItemID("");
    else setItemID(Math.floor(Math.random() * 1000000));
  }, [title]);

  async function addAnItem(e) {
    e.preventDefault();
    if (title && taka && type && itemID) {
      setload(true);

      await setDoc(doc(fdb, `products/${itemID + type}`), {
        title: title,
        img: null,
        taka: Number(taka),
        isSelected: false,
        rate: 0,
        brand: brand,
        size: arrayUnion({ sizeArr }),
        color: color,
        type: type,
        desc: descript,
        itemID: itemID,
        isStock: true,
      })
        .then(() => {
          setload(false);
          alert("Item added!");
          window.location.reload();
        })
        .catch((err) => {
          setErr(err);
          alert(error);
          setload(false);
        });
    } else {
      setErr("Something wrong, please try again or later");
      alert(error);
      console.log(title, itemID, taka, type);
      setload(false);
    }
  }
  function handleCata() {
    setcata(!showCata);
  }
  function handleType(tp) {
    settype(tp);
  }
  function handlePushSize() {
    if (size.length !== 0) setSizeArr((pre) => [...pre, size]);
    setsize("");
  }
  return (
    <>
      <div className="popcard">
        <form className="addItemForm" onSubmit={addAnItem}>
          <div className="left">
            <section className="field">
              <label htmlFor="pName">Product name</label>
              <input
                type="text"
                name="pName"
                id="pName"
                required
                value={title}
                onChange={(e) => settitle(e.target.value)}
                maxLength={50}
              />
              <span>
                Don't exceed 50 characters when entering the product name
              </span>
            </section>

            <section className="field">
              <label htmlFor="pCata">Category</label>
              <article className="cata">
                <p onClick={handleCata}>{type}</p>
                {showCata && (
                  <ul className="cata-list">
                    {catArr
                      .sort((a, b) => {
                        let x = a.toLocaleLowerCase();
                        let y = b.toLocaleLowerCase();
                        if (x > y) return 1;
                        else return -1;
                      })
                      .map((cata, id) => {
                        return (
                          <li
                            key={id}
                            onClick={() => {
                              handleType(cata);
                              handleCata();
                            }}
                          >
                            {cata}
                          </li>
                        );
                      })}
                  </ul>
                )}
              </article>
            </section>
            {/* brand */}
            <section className="field">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name="brand"
                id="brand"
                required
                value={brand}
                onChange={(e) => setbrand(e.target.value)}
              />
            </section>
            {/* size */}
            <section className="field">
              <label htmlFor="Size">Size</label>
              <div className="size">
                <input
                  type="text"
                  name="Size"
                  id="Size"
                  value={size}
                  onChange={(e) => setsize(e.target.value)}
                />
                <button
                  className="btn-size "
                  type="button"
                  onClick={handlePushSize}
                >
                  Select
                </button>
              </div>
              <ul style={{ display: "flex", gap: "2.5pt" }}>
                {sizeArr.map((ele, id) => (
                  <li
                    style={{
                      margin: "0",
                      backgroundColor: "#5555",
                      borderRadius: "50px",
                      minWidth: "60px",
                      height: "auto",
                      textAlign: "center",
                    }}
                    key={id}
                  >
                    {ele}
                  </li>
                ))}
              </ul>
            </section>
            {/* taka */}
            <section className="field">
              <label htmlFor="taka">Price</label>
              <input
                type="text"
                name="taka"
                id="taka"
                required
                value={taka}
                onChange={(e) => settaka(e.target.value)}
              />
            </section>
            {/* description */}
            <section className="field">
              <label>Description</label>
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="10"
                value={descript}
                maxLength={250}
                onChange={(e) => setdescript(e.target.value)}
              ></textarea>
              {`(${descript.length}/250)`}
            </section>
          </div>
          <button className="btn-add" type="submit" disabled={load}>
            {load ? <Spinner /> : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};
