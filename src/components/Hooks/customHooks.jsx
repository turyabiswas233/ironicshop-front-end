import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const formatMoneyIntoBDT = (taka, type) => {
  const money = new Intl.NumberFormat(type == "shortBDT" ? "bn" : "en-IN", {
    style: "currency",
    currency: "BDT",
  }).format(taka);
  return type == "shortBDT" ? money : money.slice(4, -3);
};

const convert_numToUnit = (num) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "unit",
    unit: "byte",
    unitDisplay: "narrow",
  })
    .format(num)
    .slice(0, -1);
};

const useSearchKey = () => {
  const [searchkeyword, setsearchkeyword] = useState("");
  return [searchkeyword, setsearchkeyword];
};

function getLoginRoute() {
  const location = useLocation();
  const path = location.pathname;
  const [isInLoginPage, setIsInLoginPage] = useState(false);

  useEffect(() => {
    setIsInLoginPage(
      path.includes("paymentconfirm") ||
        path.includes("login") ||
        path.includes("signup")
    );
  }, [path]);

  return { isInLoginPage };
}
// render screen size on resize
function useScreenSize() {
  const [scroll, setScroll] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: undefined,
    height: undefined,
  });
  // for scroll effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      function showScrollY() {
        let yaxis = window.scrollY;
        let isScrolledUP = yaxis > 160 ? true : false;
        if (isScrolledUP) setScroll(true);
        else setScroll(false);
      }

      window.addEventListener("scroll", (e) => {
        showScrollY();
      });
      return window.removeEventListener("scroll", showScrollY());
    }
  }, []);

  // for getting screen size
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    }
  }, []);

  return { scroll, screenSize };
}

// add items to local cart

function addToCart_LocalStorage() {
  const cartRef = "my_cart";
  const orderRef = "my_orders";
  const lcoal_storage = window.localStorage;

  const [price, setPrice] = useState(0);
  const [curCart, setCurCart] = useState([]);

  // add items to cart <--done-->
  function addItem(obj, id) {
    const preLocalCartNew = JSON.parse(lcoal_storage.getItem(cartRef));
    if (!preLocalCartNew) {
      {
        lcoal_storage.setItem(cartRef, JSON.stringify([obj]));
        alert("Added to cart");
      }
    } else if (preLocalCartNew) {
      if (preLocalCartNew.find((data) => data?.itemID == id))
        alert("Already added");
      else {
        lcoal_storage.setItem(
          cartRef,
          JSON.stringify([...preLocalCartNew, obj])
        );
        alert("Added to cart");
      }
    }
  }

  //toggle selection
  function handleToggle(id) {
    const preLocalCartNew = JSON.parse(lcoal_storage.getItem(cartRef));
    const arr = preLocalCartNew.map((data) => {
      if (data?.itemID == id) {
        return { ...data, isSelected: !data?.isSelected };
      }
      return { ...data };
    });

    lcoal_storage.setItem(cartRef, JSON.stringify(arr));
    setCurCart(JSON.parse(lcoal_storage.getItem(cartRef)));
  }
  //auto update price
  function updatePrice() {
    setPrice(0);
    const preLocalCartNew = JSON.parse(lcoal_storage.getItem(cartRef));
    preLocalCartNew?.map((item) => {
      setPrice((pre) => pre + item?.taka);
    });
  }

  //delete items from cart {}
  function deleleSelectedItems() {
    const preLocalCartNew = JSON.parse(lcoal_storage.getItem(cartRef));

    const arr = preLocalCartNew?.filter((item) => !item?.isSelected);

    if (arr.length > 0) lcoal_storage.setItem(cartRef, JSON.stringify(arr));
    else lcoal_storage.setItem(cartRef, JSON.stringify([]));
    setCurCart(JSON.parse(lcoal_storage.getItem(cartRef)));
  }
  return {
    cartRef,
    lcoal_storage,
    price,
    curCart,
    orderRef,
    addItem,
    handleToggle,
    updatePrice,
    deleleSelectedItems,
  };
}

export {
  useScreenSize,
  getLoginRoute,
  formatMoneyIntoBDT,
  convert_numToUnit,
  useSearchKey,
  addToCart_LocalStorage,
};
