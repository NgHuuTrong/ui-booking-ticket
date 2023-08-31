import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation";
import UserContextProvider from "./src/services/user/user.context";
import { Text } from "react-native";

export default function App() {
  return (
    <>
      {/* <UserContextProvider> */}
      <Text>123</Text>
      {/* </UserContextProvider> */}
      {/* <StatusBar style="auto" /> */}
    </>
  );
}
