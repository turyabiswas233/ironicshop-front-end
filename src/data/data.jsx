import { useState } from "react";

import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { fdb } from "../../firebase";
function useFullData(page) {
  const [datas, setdatas] = useState([]);

  async function getAllProducts() {
    const qry = query(
      collection(fdb, "products"),
      orderBy("itemID", "asc"),
      limitToLast(page * 10)
    );
    const snap = await getDocs(qry);

    setdatas([]);
    snap.forEach((doc) => {
      setdatas((pre) => [...pre, { id: doc.id, ...doc.data() }]);
    });
  }
  return { datas, getAllProducts };
}

function useLimitData(time) {
  const [limitdatas, setLimitDatas] = useState([]);

  async function getLimitProducts() {
    const qry = query(
      collection(fdb, "products"),
      orderBy("itemID", "asc"),
      limit(5)
    );

    const snap = await getDocs(qry);

    setLimitDatas([]);
    snap.forEach((doc) => {
      setLimitDatas((pre) => [...pre, { id: doc.id, ...doc.data() }]);
    });
    localStorage.setItem(
      "allProd",
      JSON.stringify({
        time: time,
        list: limitdatas,
      })
    );
  }

  return { limitdatas, getLimitProducts };
}

export { useFullData, useLimitData };
