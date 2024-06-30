import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserAuth } from './authContext';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebarData, setSidebarData] = useState([]);
  const { idToken } = UserAuth();

  useEffect(() => {
    if (!idToken) return;

    const fetchData = () => {
      const collectionPath = `history-${idToken}`;
      const q = query(collection(db, collectionPath));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newSideBarData = querySnapshot.docs.map(doc => ({
          title: doc.data().content,
          cName: 'nav-text',
        }));
        setSidebarData(newSideBarData);
      }, (error) => {
        console.error('Error fetching data:', error);
      });

      return () => unsubscribe();
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
