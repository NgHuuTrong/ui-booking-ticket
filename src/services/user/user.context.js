import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
  token: "",
  email: "",
  isAuthenticated: false,
  authenticate: (token, email) => {},
  logout: () => {},
});

const UserContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [email, setEmail] = useState();
  function authenticate(token, email) {
    setAuthToken(token);
    setEmail(email);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("email", email);
  }

  function logout() {
    setAuthToken(null);
    setEmail(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("email");
  }

  const value = {
    token: authToken,
    email: email,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
