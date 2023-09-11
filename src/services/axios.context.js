import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from "./user/user.context";

export const AxiosContext = createContext();

export const AxiosContextProvider = ({ children }) => {
  const userCtx = useContext(UserContext);

  const authAxios = axios.create({
    baseURL: "https://api-booking-ticket.onrender.com/api/v1", //domain of backend
  });
  const publicAxios = axios.create({
    baseURL: "https://api-booking-ticket.onrender.com/api/v1", //domain of backend
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${userCtx.access_token}`;
      }

      return config;
    },
    (error) => {
      throw error.response;
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error.response;
    }
  );

  publicAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error.response;
    }
  );

  return (
    <AxiosContext.Provider value={{ authAxios, publicAxios }}>
      {children}
    </AxiosContext.Provider>
  );
};
