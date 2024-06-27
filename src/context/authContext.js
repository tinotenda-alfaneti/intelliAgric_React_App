import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import { ENDPOINTS } from '../constants';

const UserContext = createContext();

export const AuthContextProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 5 minutes in milliseconds

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutProcedure = async () => {
    setError('');
    setSuccess(false);
    
    try {
      await signOut(auth);
      const response = await fetch(ENDPOINTS.LOGOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ token: idToken }),
      });

      console.log("LogOut Response", response);

      if (response.ok) {
        console.log("Logout successful");
        //TODO: Redirect to home
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setError('Logout failed: ' + errorData.message);
        console.log("Logout failed", errorData);
      }
    } catch (e) {
      setError('Logout failed: ' + e.message);
      console.error("Logout error", e);
    } finally {
      sessionStorage.removeItem('lastActive');
      setUser(null);
      setIdToken(null);
    }
  };

  const logout = async (e) => {
    if (e) e.preventDefault();
    await logoutProcedure();
  };

  const updateLastActive = () => {
    sessionStorage.setItem('lastActive', Date.now());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idTokenResult = await currentUser.uid;
        setIdToken(idTokenResult);
      } else {
        setIdToken(null);
      }
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      updateLastActive();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  useEffect(() => {
    const checkInactivity = () => {
      const lastActive = sessionStorage.getItem('lastActive');
      if (lastActive && Date.now() - lastActive > INACTIVITY_TIMEOUT) {
        logoutProcedure();
      }
    };

    const interval = setInterval(checkInactivity, 5000); // Check 5 every second

    return () => clearInterval(interval);
  }, [user]);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, idToken, error, success }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

