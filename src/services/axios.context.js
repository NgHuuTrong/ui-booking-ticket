import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from "./user/user.context";

export const AxiosContext = createContext();

export const AxiosContextProvider = ({ children }) => {
  const { access_token } = useContext(UserContext);

  const authAxios = axios.create({
    // baseURL: "https://api-booking-ticket.onrender.com/api/v1", //domain of backend
    baseURL: "http://192.168.1.132:3000/api/v1", //domain of backend
  });
  const publicAxios = axios.create({
    baseURL: "http://192.168.1.132:3000/api/v1", //domain of backend
    // baseURL: "https://api-booking-ticket.onrender.com/api/v1", //domain of backend
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${access_token}`;
        config.headers["Content-Type"] = "multipart/form-data";
      }

      return config;
    },
    (error) => {
      console.log("request", error);
      throw error.response;
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("response", error);
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
