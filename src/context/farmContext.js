import Swal from 'sweetalert2';
import { UserAuth } from './authContext'; 
import { ENDPOINTS } from '../constants';
import React, { createContext, useContext, useState, useEffect } from 'react';

const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const { idToken } = UserAuth();
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchFarmData = async () => {
      if (!idToken) {
        return;
      }

      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const response = await fetch(ENDPOINTS.FARM_OVERVIEW_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${idToken}`,
          },
          credentials: 'include'
        });

        const data = await response.json();
        console.log("API Response:", data.response);
        setFarmData(data.response);
      } catch (error) {
        console.error("Error fetching farm data:", error);
        Swal.fire('Error', 'Failed to fetch farm data.', 'error');
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    fetchFarmData();
  }, [idToken]);

  const value = {
    farmData,
    setFarmData
  };

  return (
    <FarmContext.Provider value={value}>
      {children}
    </FarmContext.Provider>
  );
};

// Custom hook to use the farm data context
export const useFarm = () => {
  return useContext(FarmContext);
};
