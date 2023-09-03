import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
  token: "",
  email: "",
  phone: "",
  name: "",
  password: "",
  gender: "",
  avatar: "",
  changeProfile: (newProfile) => { },
  isAuthenticated: false,
  authenticate: (token, email) => { },
  logout: () => { },
});

const UserContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [profile, setProfile] = useState({
    email: "vanhieu@gmail.com",
    phone: "091412412",
    name: "Nguyen Van Hieu",
    password: "12345",
    gender: "Male",
    avatar: "abc"
  });

  function authenticate(token, email) {
    setAuthToken(token);
    setProfile({ ...profile, email });
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("email", email);
  }

  function logout() {
    setAuthToken(null);
    setProfile({ ...profile, email: "" });
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("email");
  }

  function changeProfile(newProfile) {
    setProfile({
      ...profile,
      email: newProfile.email,
      phone: newProfile.phone,
      name: newProfile.name,
      password: newProfile.password,
      gender: newProfile.gender
    });
  }

  const value = {
    token: authToken,
    email: profile.email,
    phone: profile.phone,
    name: profile.name,
    password: profile.password,
    gender: profile.gender,
    avatar: profile.avatar,
    changeProfile: changeProfile,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
