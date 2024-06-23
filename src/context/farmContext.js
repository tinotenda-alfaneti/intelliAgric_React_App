import React, { createContext, useContext, useState } from 'react';

const FarmContext = createContext();

export const useFarm = () => {
  return useContext(FarmContext);
};

export const FarmProvider = ({ children }) => {
  const [farmData, setFarmData] = useState(null);

  return (
    <FarmContext.Provider value={{ farmData, setFarmData }}>
      {children}
    </FarmContext.Provider>
  );
};
