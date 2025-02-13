import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [globalPrompt, setGlobalPrompt] = useState(() => {
    // Load from local storage if available
    const saved = localStorage.getItem("globalPrompt");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage whenever value changes to store value after refreshing the page
  useEffect(() => {
    localStorage.setItem("globalPrompt", JSON.stringify(globalPrompt));
  }, [globalPrompt]);

  return (
    <GlobalContext.Provider value={{ globalPrompt, setGlobalPrompt }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
