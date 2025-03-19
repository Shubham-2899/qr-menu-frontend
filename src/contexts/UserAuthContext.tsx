/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  setPersistence,
  sendPasswordResetEmail,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../firebase";
import React from "react";
import {
  AuthContextModel,
  AuthProviderProps,
  UserContextState,
} from "../interfaces/index";

export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState
);

const userAuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

export function useAuth(): AuthContextModel {
  return useContext(userAuthContext);
}

export function UserAuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [login, setLogin] = useState(false);
  const [loading,setLoading] = useState(true);

  async function logIn(email: string, password: string) {
    //   const persistence = false  //remember me functionality
    //  ? auth.Persistence.LOCAL
    //  : auth.Auth.Persistence.SESSION;
    await setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email: string, password: string, username: string) {
    console.log("username:", username);
    setLogin(false);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    console.log("logout");
    setLogin(false);
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const values = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    login,
    setLogin,
    resetPassword,
    loading,
    setLoading
  };

  return (
    <userAuthContext.Provider value={values}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
