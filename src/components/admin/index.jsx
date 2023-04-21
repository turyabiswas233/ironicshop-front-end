import React, { useEffect, useReducer, useState } from "react";
import "../../styles/admin.css";
import watch from "../../assets/watch.png";
import menuicon from "../../assets/tools/icons/Menu_icon.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/firebase/AuthContext";
import {
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
      {popUp && <PopUpCard handlePopUP={handlePopUP} popUp={popUp} />}
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
            Notification{" "}
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
const AdminNavbar = ({
  state,
  onclick,
  handleCloseNav,
  closeNav,
  handlePopUP,
}) => {
  return (
    <div className={`adminNavbar ${closeNav ? "active" : ""}`}>
      <button className="crossNav" onClick={handleCloseNav}>
        x
      </button>
      <button
        className="btn btn-black btn-bold btn-p-1"
        onClick={() => {
          handlePopUP();
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
  console.log(orders[0]?.orderdItems[0].newData[0]);
  return (
    <div className="dashboard">
      <table cellSpacing={0}>
        <thead>
          <tr className="header">
            <th>Name</th>
            <th>Phone</th>

            <th>Email</th>
            <th>Address</th>
            <th>Total Price</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {orders
            ?.sort((a, b) => {
              return a.taka - b.taka;
            })
            ?.map((product, id) => {
              return (
                <>
                  <tr key={id}>
                    <td>{product.cust_name}</td>
                    <td>{product.cust_phone}</td>
                    <td>{product.cust_email}</td>
                    <td>{product.cust_add}</td>
                    <td rowSpan={2}>
                      {formatMoneyIntoBDT(product.totalPrice)} TK
                    </td>
                    <td rowSpan={2}>
                      <button
                        className="btn"
                        style={{ backgroundColor: "#32ef3c" }}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                  <tr className="order">
                    <td style={{ fontWeight: "bold" }}>Order</td>
                    <td colSpan={4}>
                      <ol>
                        {orders[id]?.orderdItems[0]?.newData?.map(
                          (data, id1) => {
                            return (
                              <li style={{ marginLeft: "15px" }} key={id1}>
                                {data?.title} : {formatMoneyIntoBDT(data.taka)}{" "}
                                tk
                              </li>
                            );
                          }
                        )}
                      </ol>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

// Products
const Products = () => {
  const { limitdatas, getLimitProducts } = useLimitData();
  useEffect(() => {
    getLimitProducts();
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
const PopUpCard = ({ handlePopUP, popUp }) => {
  // items info
  const [title, settitle] = useState("");
  const [taka, settaka] = useState("");
  const [type, settype] = useState("");
  const [load, setload] = useState(false);
  const [itemID, setItemID] = useState("");
  const [error, setErr] = useState("");

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
        type: type,
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
      setload(false);
    }
  }
  return (
    <>
      <div className="popcard">
        <header>
          <h2>add a product</h2>
          <button className="btn-cross" onClick={handlePopUP}>
            x
          </button>
        </header>
        <form className="addItemForm" onSubmit={addAnItem}>
          {/* title */}
          <section className="">
            <label htmlFor="name">Product Name </label>
            <input
              required
              type="text"
              id="name"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
          </section>
          {/* image */}
          <section className="">
            <label htmlFor="img">image </label>
            <input type="text" id="img" />
          </section>
          {/* type */}
          <section className="">
            <label htmlFor="type">Type </label>
            <input
              required
              value={type}
              onChange={(e) => settype(e.target.value)}
              type="text"
              id="type"
            />
          </section>
          {/* itemID */}
          <section className="">
            <label htmlFor="itemID">Item ID </label>
            <input
              type="text"
              value={itemID}
              disabled
              name="itemID"
              id="itemID"
            />
          </section>
          {/* taka */}
          <section className="">
            <label htmlFor="taka">
              Price <small>(BDT)</small>{" "}
            </label>
            <input
              required
              value={taka}
              onChange={(e) => settaka(e.target.value)}
              type="number"
              id="taka"
            />
          </section>
          <button
            className=" btn-red btn-txt-white btn-add"
            type="submit"
            disabled={load}
          >
            {load ? <Spinner /> : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};
