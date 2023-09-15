import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import { UserContext } from "../services/user/user.context";
import { HomeTabs } from "./bottomNavigation";
import { StyleSheet } from "react-native";
import { themeColors } from "../theme";
const Drawer = createDrawerNavigator();

export const AuthStack = () => {
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
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: themeColors.bgScreen,
  },
});
