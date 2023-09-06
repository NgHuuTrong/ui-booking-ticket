import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from "./user/user.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AxiosContext = createContext();

export const AxiosContextProvider = ({ children }) => {
  const userCtx = useContext(UserContext);

  const authAxios = axios.create({
    baseURL: "http://192.168.1.132:3000/api/v1", //domain of backend
  });
  const publicAxios = axios.create({
    baseURL: "http://192.168.1.132:3000/api/v1", //domain of backend
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        console.log("token", userCtx.access_token);
        config.headers.Authorization = `Bearer ${userCtx.access_token}`;
      }

      return config;
    },
    (error) => {
      return error.response.data;
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //handle common errors, EX: 401 -> accessToken is not valid
      if (error.response.status === 401) {
        AsyncStorage.removeItem("access_token");
      }
      return error.response.data;
    }
  );

  publicAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //handle common errors, EX: 401 -> accessToken is not valid
      if (error.response.status === 401) {
        AsyncStorage.removeItem("access_token");
      }
      return error.response.data;
    }
  );

  return (
    <AxiosContext.Provider value={{ authAxios, publicAxios }}>
      {children}
    </AxiosContext.Provider>
  );
};
