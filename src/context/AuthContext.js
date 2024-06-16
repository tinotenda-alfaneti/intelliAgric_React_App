import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../firebase'; 

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     console.log(currentUser);
  //     setUser(currentUser);
  //   });
  //   return unsubscribe; 
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idTokenResult = await currentUser.getIdTokenResult();
        setIdToken(idTokenResult.token);
      } else {
        setIdToken(null);
      }
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, idToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};


// const idToken = await firebase.auth().currentUser.getIdToken(true);