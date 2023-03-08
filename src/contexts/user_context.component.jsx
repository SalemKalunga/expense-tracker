import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase";
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: null,
});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });
  }, []);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
