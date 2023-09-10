import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LeaderBoardScreen } from "../screens/LeaderBoardScreen";
import { MatchScreen } from "../screens/MatchScreen";
import { MatchDetailScreen } from "../screens/MatchDetailScreen";
import { MyTicketScreen } from "../screens/MyTicketScreen";
import { Easing, Image, LogBox, Text, View } from "react-native";
import { themeColors } from "../theme";
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
          component={HomeTabs}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          height: 75,
          alignItems: "center",
          backgroundColor: themeColors.bgScreen,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="MyTicket" component={MyTicketScreen} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen} />
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === "Home") {
    icon = focused ? (
      <View className="items-center">
        <Image
          source={require("../../assets/images/HomeIconGreen.png")}
          className="w-9 h-9"
        />
        <Text style={{ color: themeColors.bgButton }}>Home</Text>
      </View>
    ) : (
      <View className="items-center">
        <Image
          source={require("../../assets/images/HomeIconWhite.png")}
          className="w-9 h-9"
        />
        <Text className="text-white">Home</Text>
      </View>
    );
  } else if (route.name === "Match") {
    icon = focused ? (
      <View className="items-center">
        <Image
          source={require("../../assets/images/MatchesIconGreen.png")}
          className="w-9 h-9"
        />
        <Text style={{ color: themeColors.bgButton }}>Matches</Text>
      </View>
    ) : (
      <View className="items-center">
        <Image
          source={require("../../assets/images/MatchesIconWhite.png")}
          className="w-9 h-9"
        />
        <Text className="text-white">Matches</Text>
      </View>
    );
  } else if (route.name === "MyTicket") {
    icon = focused ? (
      <View className="items-center">
        <Image
          source={require("../../assets/images/TicketIconGreen.png")}
          className="w-9 h-9"
        />
        <Text style={{ color: themeColors.bgButton }}>My Ticket</Text>
      </View>
    ) : (
      <View className="items-center">
        <Image
          source={require("../../assets/images/TicketIconWhite.png")}
          className="w-9 h-9"
        />
        <Text className="text-white">My Ticket</Text>
      </View>
    );
  } else if (route.name === "LeaderBoard") {
    icon = focused ? (
      <View className="items-center">
        <Image
          source={require("../../assets/images/LeaderBoardIconGreen.png")}
          className="w-9 h-9"
        />
        <Text style={{ color: themeColors.bgButton }}>Rankings</Text>
      </View>
    ) : (
      <View className="items-center">
        <Image
          source={require("../../assets/images/LeaderBoardIconWhite.png")}
          className="w-9 h-9"
        />
        <Text className="text-white">Rankings</Text>
      </View>
    );
  }

  let buttonClass = focused ? "bg-white" : "";
  return (
    <View className={"flex items-center rounded-full p-3 shadow" + buttonClass}>
      {icon}
    </View>
  );
};
