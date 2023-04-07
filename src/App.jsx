import "./App.css";

import { Routes, Route } from "react-router-dom";
import ErrorPage from "./components/404";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer";

function App() {
  const Home = lazy(() => import("./components/Home"));
  const Login = lazy(() => import("./components/account/login/index"));
  const ItemDetails = lazy(() => import("./components/ItemDetails"));
  const YourCart = lazy(() => import("./components/YourCart"));
  const Admin = lazy(() => import("./components/admin"));

  const Spinner = () => {
    <>Loading...</>;
  };
  return (
    <div className="App">
      <Routes>
        <Route element={<ErrorPage />} path={"*"} />
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          }
          path={"/"}
        />
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <ItemDetails />
            </Suspense>
          }
          path={"/item/:itemId"}
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
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
