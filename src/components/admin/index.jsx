import React, { useReducer } from "react";
import "../../styles/admin.css";
import watch from "../../assets/watch.png";
import { Link } from "react-router-dom";

function Admin() {
  const [state, dispatch] = useReducer(reducer, adminNavOptions[2]);
  function reducer(state, action) {
    switch (action?.type) {
      case action?.payload:
        return action?.payload;

      default:
        state;
    }
  }
  return (
    <div className="admin_root">
      <AdminTopbar />
      <div
        style={{
          display: "flex",
          height: "calc(100% - 4rem)",
        }}
      >
        <AdminNavbar state={state} onclick={dispatch} />
        <AdminRouteBox routeName={state} />
      </div>
    </div>
  );
}

// top bar
const AdminTopbar = () => {
  return (
    <header>
      <div className="adminTopbar">
        <h2>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <span className="logo">iRonic Store</span>
          </Link>
        </h2>
        <ul>
          <li>alarm</li>
          <li>Account</li>
        </ul>
      </div>
    </header>
  );
};

// ;left navbar
const AdminNavbar = ({ state, onclick }) => {
  return (
    <div className="adminNavbar">
      <button className="btn btn-black btn-bold btn-p-1">Add product</button>
      <div>
        <ul>
          {adminNavOptions.map((ele, id) => {
            return (
              <li
                className={` ${ele == state ? "bg-white" : ""}`}
                key={id}
                onClick={() => onclick({ type: ele, payload: ele })}
              >
                {ele}
              </li>
            );
          })}
        </ul>
        <button className="btn btn-logout btn-bold btn-p-1">Logout</button>
      </div>
    </div>
  );
};
const adminNavOptions = ["dashboard", "products", "users", "ads"];
export default Admin;

// admin route to each section

const AdminRouteBox = ({ routeName }) => {
  return (
    <div className="adminRouteBox">
      <h1 className="routeName">{routeName}</h1>
      {routeName == "dashboard" && <Dashboard />}
      {routeName == "products" && <Products />}
      {routeName == "sells list" && <Sells />}
      {routeName == "users" && <Users />}
      {routeName == "ads" && <Ads />}
      <div className="adminGrad"></div>
    </div>
  );
};

// Dashboard
const Dashboard = () => {
  return <div>Dashboard</div>;
};

// Products
const Products = () => {
  return (
    <div className="products-box">
      <table cellSpacing={0}>
        <thead>
          <tr className="header">
            <th>Image</th>
            <th>Name</th>
            <th>Product ID</th>
            <th>Sold</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Mark As</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="users_data">
          {products.map((product, id) => {
            return (
              <tr key={id}>
                <td>
                  <img className="w-50" src={product.img} alt="profile" />
                </td>

                <td>{product.name}</td>
                <td>{product.proId}</td>
                <td>{product.sold}</td>
                <td>{product.rating}</td>
                <td>{product.price}</td>

                <td>
                  <button className="btn btn-cyan btn-txt-white btn-bold round-full btn-px-2 btn-py-1">
                    Out of stock
                  </button>
                </td>
                <td>
                  <button className="btn btn-delete btn-txt-white btn-bold round-full btn-px-2 btn-py-1">
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
const Users = () => {
  return (
    <div className="users-box">
      <table cellSpacing={0}>
        <thead>
          <tr className="header">
            <th>Image</th>
            <th>Name</th>

            <th>Block</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, id) => {
            return (
              <tr key={id}>
                <td>
                  <img className="w-50" src={user.img} alt="profile" />
                </td>

                <td className="username">{user.name}</td>

                <td>
                  <button className="btn btn-cyan btn-txt-white btn-bold round-full btn-px-2 btn-py-1">
                    Block
                  </button>
                </td>
                <td>
                  <button className="btn btn-delete btn-txt-white btn-bold round-full btn-px-2 btn-py-1">
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

const users = [
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
  { name: "Ishrat Mimi", img: watch },
];

const products = [
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
  {
    img: watch,
    name: "Apple 7pro Watch",
    sold: 1203,
    rating: 3.4,
    price: 20300,
    proId: "#fbhfhg7S",
  },
];
