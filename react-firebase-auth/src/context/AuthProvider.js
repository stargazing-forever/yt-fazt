import { useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';

import {auth} from '../firebase/config';
import { AuthContext } from './AuthContext';
export const AuthProvider = ({ children }) => {

  //hooks
  const [user, setUser] = useState(null);

  //functions
  const singup = (email, password ) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const singin = (email, password ) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const singinGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  const singout = () => {
    return signOut(auth);
  }

  const resetPassword = ( email ) => {
    return sendPasswordResetEmail( auth, email )
  }

  const value = {
    singup, 
    singin, 
    singout, 
    user, 
    setUser, 
    singinGoogle,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}
