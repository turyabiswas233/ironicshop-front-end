import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./components/404";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer";
import Buynow from "./components/buy_status/Buynow";
import Signup from "./components/account/signup";
import { useAuthContext } from "./components/Hooks/firebase/AuthContext";
import CompleteUserForm from "./components/account/CompleteUserForm";
import MessengerChat from "./components/MessengerChat";

function App() {
  const Home = lazy(() => import("./components/Home"));
  const Login = lazy(() => import("./components/account/login/index"));
  const ItemDetails = lazy(() => import("./components/ItemDetails"));
  const YourCart = lazy(() => import("./components/YourCart"));
  const Admin = lazy(() => import("./components/admin"));

  const { currentUser } = useAuthContext();

  const AdminInteractBox = () => {
    return (
      <>
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#23cffa",
            padding: ".5rem 3rem",
            textAlign: "center",
            width: "70vh",
            maxWidth: "350px",
            color: "#112",
            fontWeight: "bold",
            letterSpacing: ".72pt",
            borderRadius: "0 0 .5rem .5rem ",
            borderBottom: "3pt solid black",
          }}
        >
          You are interacting as admin
        </div>
      </>
    );
  };

  return (
    <div className="App">
      {currentUser?.displayName?.includes("admin") && <AdminInteractBox />}
      <Routes>
        <Route element={<ErrorPage />} path={"*"} />
        <Route
          element={
            currentUser && !currentUser?.displayName ? (
              <Navigate to={"/c_yourprofile"} />
            ) : (
              <Suspense fallback={<Spinner />}>
                <Home />
              </Suspense>
            )
          }
          path={"/"}
        />
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <ItemDetails />
            </Suspense>
          }
          path={"/item/:id"}
        />
        <Route element={"feaa"} path={"/offer/:offerId"} />
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          }
          path={"/account/login"}
        />
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <YourCart />
            </Suspense>
          }
          path={"/yourcart"}
        />
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <Admin />
            </Suspense>
          }
          path={"/admin"}
        />
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <Buynow />
            </Suspense>
          }
          path={"/paymentconfirm"}
        />
        <Route
          element={currentUser ? <Navigate to={"/"} /> : <Signup />}
          path={"/account/signup"}
        />
        <Route
          element={
            currentUser && !currentUser?.displayName ? (
              <Suspense fallback={<Spinner />}>
                <CompleteUserForm />
              </Suspense>
            ) : (
              <Navigate to={"/"} />
            )
          }
          path={"/c_yourprofile"}
        />
      </Routes>
      <MessengerChat />
      <Footer />
    </div>
  );
}
const Spinner = () => {
  <>Loading...</>;
};
export default App;
