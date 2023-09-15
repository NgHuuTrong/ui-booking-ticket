import { HomeScreen } from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LeaderBoardScreen } from "../screens/LeaderBoardScreen";
import { MatchScreen } from "../screens/MatchScreen";
import { MyTicketScreen } from "../screens/MyTicketScreen";
import { Image, LogBox, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export const HomeTabs = () => {
  const isDrawerOpen = useDrawerStatus() === "open";
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        //   tabBarShowLabel: false,
        //   tabBarIcon: ({ focused }) => menuIcons(route, focused),
        //   tabBarStyle: {
        //     height: isDrawerOpen ? 0 : 80,
        //     alignItems: "center",
        //     backgroundColor: themeColors.bgCard,
        //     transform: "rotateX(45deg) rotateZ(0.785398rad)",
        //   },
      })}
    >
      <Tab.Screen name="Home2" component={HomeScreen} />
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="MyTicket" component={MyTicketScreen} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen} />
    </Tab.Navigator>
    // </View>
  );
};

const BottomTab = ({ type, color, size = 24, isFocused, index }) => {
  let icon;
  if (index == 0) {
    icon = isFocused ? (
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
  } else if (index == 1) {
    icon = isFocused ? (
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
  } else if (index == 2) {
    icon = isFocused ? (
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
  } else if (index == 3) {
    icon = isFocused ? (
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

  return icon;
};

const MyTabBar = ({ state, descriptors, navigation }) => {
  const drawerProgress = useDrawerProgress();
  const viewStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0]);
    return {
      transform: [{ scale }],
    };
  });
  return (
    <View style={{ backgroundColor: themeColors.bgCard }}>
      <Animated.View style={[styles.bottomBar, viewStyles]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              testID={options.tabBarTestID}
              accessibilityRole="button"
            >
              <BottomTab index={index} isFocused={isFocused} size={24} />
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    height: 75,
    backgroundColor: themeColors.bgScreen,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  middleIcon: {
    bottom: 18,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    elevation: 8,
  },
});
