import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext();
export default function TokenContextProvider(props) {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserToken(localStorage.getItem("user"));
    }
  }, []);

  return (
    <TokenContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
