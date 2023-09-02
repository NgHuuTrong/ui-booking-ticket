import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LeaderBoardScreen } from "../screens/LeaderBoardScreen";
import { MatchScreen } from "../screens/MatchScreen";
import { MyTicketScreen } from "../screens/MyTicketScreen";
import { Image, LogBox, Platform, Text, View } from "react-native";
import { themeColors } from "../theme";
import { ProfileScreen } from "../screens/ProfileScreen";
import { VideoPlayerScreen } from "../screens/VideoPlayerScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

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
