import { UserAuth } from './authContext';
import { ENDPOINTS } from '../constants';
import React, { createContext, useContext, useState, useEffect } from 'react';

const IoTContext = createContext();

export const IoTProvider = ({ children }) => {
  const { idToken } = UserAuth();
  const [soilData, setSoilData] = useState({
    temp: '---',
    mois: '---',
    ph: '---',
    npk: '---',
  });

  useEffect(() => {
    const fetchSoilData = async () => {
      if (!idToken) {
        console.log('No idToken found. Exiting fetchSoilData.');
        return;
      }

      try {
        const response = await fetch(ENDPOINTS.SOIL_DATA_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${idToken}`,
          },
          credentials: 'include'
        });

        const data = await response.json();
        console.log("Soil Data Response:", data);
        setSoilData(data.response);
      } catch (error) {
        console.error("Error fetching soil data:", error);
        setSoilData(null); // Clear soilData on error if needed
      }
    };

    fetchSoilData();
  }, [idToken]);

  const value = {
    soilData,
    setSoilData,
  };

  return (
    <IoTContext.Provider value={value}>
      {children}
    </IoTContext.Provider>
  );
};

// Custom hook to use the soil data context
export const useSoilData = () => {
  return useContext(IoTContext);
};