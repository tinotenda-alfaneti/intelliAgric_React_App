import { UserAuth } from './authContext';
import { ENDPOINTS } from '../constants';
import React, { createContext, useContext, useState, useEffect } from 'react';

const IoTContext = createContext();

export const IoTProvider = ({ children }) => {
  const { idToken } = UserAuth();
  const [dailyAverages, setDailyAverages] = useState(null);
  const [soilAnalysisData, setSoilAnalysisData] = useState(null);
  const [currentSoilData, setCurrentSoilData] = useState(null);

  const fetchSoilAnalysisData = () => {
    console.log("Fetching soil analysis data");
    fetch(ENDPOINTS.SOIL_ANALYSIS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Soil analysis data fetched:", data);
        setSoilAnalysisData(data);
      })
      .catch(error => {
        console.log('Error fetching soil analysis data:', error);
      });
  };

  const fetchDailyAverages = () => {
    console.log("Fetching daily averages data");
    fetch(ENDPOINTS.DAILY_AVERAGES_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Daily averages data fetched:", data);
        setDailyAverages(data);
      })
      .catch(error => {
        console.log('Error fetching daily averages data:', error);
      });
  };


  const fetchCurrentSoilData = () => {
    console.log("Fetching current soil data");
    fetch(ENDPOINTS.SOIL_CURRENT_DATA_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Current soil data fetched:", data);
        setCurrentSoilData(data);
      })
      .catch(error => {
        console.log('Error fetching current soil data:', error);
      });
  };

  useEffect(() => {
    if (idToken) {
      fetchSoilAnalysisData();
      fetchDailyAverages();
      fetchCurrentSoilData();
    }
  }, [idToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (idToken) {
        fetchSoilAnalysisData();
        fetchDailyAverages();
        fetchCurrentSoilData();
      }
    }, 300000);
    return () => clearInterval(interval);
  }, [idToken]);

  const value = { soilAnalysisData, dailyAverages, currentSoilData};

  return (
    <IoTContext.Provider value={value}>
      {children}
    </IoTContext.Provider>
  );
};

// Custom hook to use the soil data context
export const useIoT = () => {
  return useContext(IoTContext);
};
