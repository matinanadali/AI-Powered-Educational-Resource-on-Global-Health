import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalPrompt, setGlobalPrompt] = useState("");

  return (
    <GlobalContext.Provider value={{ globalPrompt, setGlobalPrompt }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
