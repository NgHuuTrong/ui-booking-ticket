import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import { UserContext } from "../services/user/user.context";
import { UpdatePasswordScreen } from "../screens/UpdatePasswordScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { Feather } from "@expo/vector-icons";
import { HomeTabs } from "./bottomNavigation";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Easing, StyleSheet } from "react-native";
import { themeColors } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
const Drawer = createDrawerNavigator();

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

export const AuthStack = () => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerActiveBackgroundColor: "#0a41cf",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
        swipeEdgeWidth: 180,
        overlayColor: "transparent",
        sceneContainerStyle: { flex: 1 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabs}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      {isAuthenticated && (
        <>
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="person-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="UpdatePassword"
            component={UpdatePasswordScreen}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={22}
                  color={color}
                />
              ),
            }}
          />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{ mode: "signIn" }}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="login-variant"
                  size={22}
                  color="white"
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Signup"
            component={LoginScreen}
            initialParams={{ mode: "signUp" }}
            options={{
              drawerIcon: ({ color }) => (
                <Feather name="user-plus" size={22} color={color} />
              ),
              gestureDirection: "vertical",
              headerShown: false,
              transitionSpec: {
                open: config,
                close: closeConfig,
              },
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: themeColors.bgScreen,
  },
});
