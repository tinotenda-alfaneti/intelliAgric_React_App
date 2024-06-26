import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserAuth } from './authContext';
import { ENDPOINTS } from '../constants';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebarData, setSidebarData] = useState([]);
  const { idToken } = UserAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!idToken) return;

      try {
        const response = await fetch(ENDPOINTS.SAVED_CHAT_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
        });

        const result = await response.json();
        if (result.success) {
          const newSideBarData = result.messages.map(message => ({
            title: message.content,
            cName: 'nav-text',
          }));
          setSidebarData(newSideBarData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idToken]);

  return (
    <SidebarContext.Provider value={sidebarData}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarData = () => useContext(SidebarContext);
