import { useState, useEffect } from "react";
import { auth } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

function useAuthContext() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (us) => {
      setCurrentUser(us);
    });

    return () => {
      unsub();
    };
  }, [auth]);
  return { currentUser };
}
export { useAuthContext };
