"use client";

import { IProps } from "./props";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TokenStorageHelper } from "shared";

const AuthContext = createContext({
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<IProps>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!TokenStorageHelper.getToken());

  const login = (token: string) => {
    TokenStorageHelper.storeToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    TokenStorageHelper.removeToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
