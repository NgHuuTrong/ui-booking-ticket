import { AppNavigation } from "./src/navigation/appNavigation";
import { UserContextProvider } from "./src/services/user/user.context";

export default function App() {
  return (
    <UserContextProvider>
      <AppNavigation></AppNavigation>
    </UserContextProvider>
  );
}
