import React, { useReducer } from "react";
import "../../styles/admin.css";

function Admin() {
  const [state, dispatch] = useReducer(reducer, adminNavOptions[0]);
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
          <span className="logo">iRonic Store</span>
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
const adminNavOptions = ["dashboard", "products", "users", "sells list", "ads"];
export default Admin;

// admin route to each section

const AdminRouteBox = ({ routeName }) => {
  return (
    <div className="adminRouteBox">
      <h1 className="routeName">{routeName}</h1>
      {routeName == "users" && <Users />}
    </div>
  );
};

// users
const Users = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Block for a month</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
        <TBody />
      </tbody>
    </table>
  );
};

const TBody = () => {
  return (
    <tr>
      <td>
        <button>Logo</button>
      </td>
      <td>Israt Mimi</td>
      <td className="td_btn">
        <button className="btn-cyan btn-txt-white btn-bold btn btn-round-full">
          Block
        </button>
      </td>
      <td className="td_btn">
        <button className="btn-red btn-txt-white btn-bold btn btn-round-full">
          Delete
        </button>
      </td>
    </tr>
  );
};
