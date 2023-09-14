import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MatchDetailScreen } from "../screens/MatchDetailScreen";
import { Easing, Image, LogBox, Text, View } from "react-native";
import { ProfileScreen } from "../screens/ProfileScreen";
import { VideoPlayerScreen } from "../screens/VideoPlayerScreen";
import { ClubDetailScreen } from "../screens/ClubDetailScreen";
import { TicketDetailScreen } from "../screens/TicketDetailScreen";
import { LoginScreen } from "../screens/LoginScreen";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { ChooseSeatScreen } from "../screens/ChooseSeatScreen";
import { DetailOrderInforScreen } from "../screens/DetailOrderInforScreen";
import { DetailOrderPaymentScreen } from "../screens/DetailOrderPaymentScreen";
import { PaypalPayment } from "../screens/PaypalPayment";
import { PaymentSuccess } from "../screens/PaymentSuccess";
import { GroupDetailScreen } from "../screens/GroupDetailScreen";
import { UpdatePasswordScreen } from "../screens/UpdatePasswordScreen";
import { MapBoxScreen } from "../components/Club/MapBox";
import { AuthStack } from "./drawerNavigator";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={AuthStack}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
        <Stack.Screen
          name="MatchDetail"
          options={{ headerShown: false }}
          component={MatchDetailScreen}
        />
        <Stack.Screen
          name="Video"
          options={{ headerShown: false }}
          component={VideoPlayerScreen}
        />
        <Stack.Screen
          name="ClubDetail"
          options={{ headerShown: false }}
          component={ClubDetailScreen}
        />
        <Stack.Screen
          name="TicketDetail"
          options={{ headerShown: false }}
          component={TicketDetailScreen}
        />
        <Stack.Screen
          name="ChooseSeat"
          options={{ headerShown: false }}
          component={ChooseSeatScreen}
        />
        <Stack.Screen
          name="DetailOrderInfor"
          options={{ headerShown: false }}
          component={DetailOrderInforScreen}
        />
        <Stack.Screen
          name="DetailOrderPayment"
          options={{ headerShown: false }}
          component={DetailOrderPaymentScreen}
        />
        <Stack.Screen
          name="PaypalPayment"
          options={{ headerShown: false }}
          component={PaypalPayment}
        />
        <Stack.Screen
          name="PaymentSuccess"
          options={{ headerShown: false }}
          component={PaymentSuccess}
        />
        <Stack.Screen
          name="Login"
          options={{
            gestureDirection: "vertical",
            headerShown: false,
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="GroupDetail"
          options={{ headerShown: false }}
          component={GroupDetailScreen}
        />
        <Stack.Screen
          name="UpdatePassword"
          options={{ headerShown: false }}
          component={UpdatePasswordScreen}
        />
        <Stack.Screen
          name="MapBox"
          options={{ headerShown: false }}
          component={MapBoxScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
