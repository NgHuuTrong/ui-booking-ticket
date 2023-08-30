import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation";
import UserContextProvider from "./src/services/user/user.context";

export default function App() {
  return (
    <>
      <UserContextProvider>
        <Navigation />
      </UserContextProvider>
      <StatusBar style="auto" />
    </>
  );
}
