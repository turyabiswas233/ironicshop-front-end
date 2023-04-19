import { useState } from "react";

import {
  collection,
  doc,
  getDocs,
  query,
  limit,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { fdb } from "../../firebase";
function useFullData() {
  const [datas, setdatas] = useState([]);

  async function getAllProducts() {
    const qry = query(collection(fdb, "products"));
    const snap = await getDocs(qry);

    setdatas([]);
    snap.forEach((doc) => {
      setdatas((pre) => [...pre, { id: doc.id, ...doc.data() }]);
    });
  }
  return { datas, getAllProducts };
}
function useLimitData() {
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
  }
  return { limitdatas, getLimitProducts };
}

export { useFullData, useLimitData };
