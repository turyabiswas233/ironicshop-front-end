import { useState, useEffect } from "react";

const formatMoneyIntoBDT = (taka, type) => {
  const money = new Intl.NumberFormat(type == "shortBDT" ? "bn-IN" : "en", {
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
  const [isInLoginPage, setIsInLoginPage] = useState(false);

  useEffect(() => {
    setIsInLoginPage(window.location.pathname.includes("login"));
  });
  return { isInLoginPage };
}
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

export {
  useScreenSize,
  getLoginRoute,
  formatMoneyIntoBDT,
  convert_numToUnit,
  useSearchKey,
};
