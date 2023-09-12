import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
  access_token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk0MzEzMjg0LCJleHAiOjE3MDIwODkyODR9.sJwYsM_vdpmUlybII5UZ2-Vk-VY6L-CtWijHcukWUI8"
  );

  function authenticate(token) {
    setAccessToken(token);
    AsyncStorage.setItem("access_token", token);
  }

  function logout() {
    setAccessToken(null);
    AsyncStorage.removeItem("access_token");
  }

  const value = {
    access_token: accessToken,
    isAuthenticated: !!accessToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// export default UserContextProvider;
