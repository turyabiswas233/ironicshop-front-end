import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { fdb } from "../../../../firebase";
import { useAuthContext } from "./AuthContext";

const useUserContext = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuthContext();
  async function getUsers() {
    const useref = collection(fdb, "users");
    const q = query(useref, where("admin", "==", false));
    const userSnap = await getDocs(q);
    setUsers([]);
    userSnap.docs.map((doc) => setUsers((pre) => [...pre, { ...doc.data() }]));
  }

  // get current user data
  const [curUser, setCurUser] = useState({});
  useEffect(() => {
    async function getCurUser() {
      try {
        const snapshot = await getDoc(doc(fdb, "users", currentUser?.uid));
        setCurUser(snapshot.data());
      } catch (e) {
        console.log("e", e);
      }
    }
    getCurUser();
  }, [currentUser]);

  useEffect(() => {
    getUsers();
  }, [curUser?.admin == true]);
  return { users, curUser };
};

export { useUserContext };
