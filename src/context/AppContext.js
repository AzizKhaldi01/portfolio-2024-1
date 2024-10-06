import { createContext, useEffect, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // Define the shared state
  const [firstLoad, setFirstLoad] = useState(true); // Track if it's the first load
  // Detect first load
  useEffect(() => {
    setTimeout(() => {
        setFirstLoad(false); // Otherwise, it's not the first load
    }, 2000);
  }, []);

  return (
    <AppContext.Provider value={{ firstLoad }}>
      {children}
    </AppContext.Provider>
  );
};
