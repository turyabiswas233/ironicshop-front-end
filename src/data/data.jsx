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

async function useLimitData() {
  const qry = query(
    collection(fdb, "products"),
    orderBy("itemID", "asc"),
    limit(5)
  );

  const snap = await getDocs(qry);

  const lists = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return lists;
}

export { useFullData, useLimitData };
