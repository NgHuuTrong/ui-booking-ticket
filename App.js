import { useEffect, useState } from "react";
import { AppNavigation } from "./src/navigation/appNavigation";
import { UserContextProvider } from "./src/services/user/user.context";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { AppIntroPage } from "./src/components/AppIntroPage";
import { AxiosContextProvider } from "./src/services/axios.context";
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 4000);
  }, []);
  if (isLoading) {
    return <AppIntroPage></AppIntroPage>;
  }
  return (
    <UserContextProvider>
      <AxiosContextProvider>
        <AppNavigation />
      </AxiosContextProvider>
    </UserContextProvider>
  );
}
