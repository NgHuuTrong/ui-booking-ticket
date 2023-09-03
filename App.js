import { AppNavigation } from "./src/navigation/appNavigation";
import { UserContextProvider } from "./src/services/user/user.context";
import "react-native-gesture-handler";
import "react-native-reanimated";
export default function App() {
  return (
    <UserContextProvider>
      <AppNavigation></AppNavigation>
    </UserContextProvider>
  );
}
