import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from "./user/user.context";

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
        config.headers.Authorization = `Bearer ${userCtx.access_token}`;
      }

      return config;
    },
    (error) => {
      return error.response;
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return error.response;
    }
  );

  publicAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return error.response;
    }
  );

  return (
    <AxiosContext.Provider value={{ authAxios, publicAxios }}>
      {children}
    </AxiosContext.Provider>
  );
};
