import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { themeColors } from "../theme";
import { useDrawerStatus } from "@react-navigation/drawer";
import { getUser } from "../services/user/user.service";
import { UserContext } from "../services/user/user.context";
import { AxiosContext } from "../services/axios.context";
import { ErrorAlertModal } from "../components/ErrorAlertModal";

const CustomDrawer = (props) => {
  const [currentName, setCurrentName] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const isDrawerOpen = useDrawerStatus() === "open";
  const { isAuthenticated, logout } = useContext(UserContext);
  const { authAxios } = useContext(AxiosContext);
  const handleLogOut = () => {
    logout();
    props.navigation.closeDrawer();
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        url: "https://www.uefa.com/uefachampionsleague/",
      });
    } catch (error) {
      setErrorMessage(
        "Error occurs when sharing content, please try again later."
      );
    }
  };

  useEffect(() => {
    if (isDrawerOpen && !isAuthenticated) {
      setCurrentName("");
      setCurrentImage("");
    }
    if (isDrawerOpen && isAuthenticated) {
      const fetchData = async () => {
        try {
          const res = await getUser(authAxios);
          setCurrentName(res.name);
          setCurrentImage(res.photo);
        } catch (error) {
          setErrorMessage("Error while fetching user's data");
        }
      };

      fetchData();
    }
  }, [isDrawerOpen]);

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bgCard }}>
      {errorMessage && (
        <ErrorAlertModal message={errorMessage}></ErrorAlertModal>
      )}
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={require("../../assets/images/DrawerBackground.jpg")}
          style={{ padding: 20 }}
        >
          <View className="items-center">
            <Image
              source={
                currentImage
                  ? { uri: currentImage }
                  : require("../../assets/images/DefaultProfilePic.png")
              }
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                //   fontFamily: "Roboto-Medium",
                marginBottom: 5,
              }}
            >
              {currentName}
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,

            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
          {!isAuthenticated && (
            <>
              <DrawerItem
                label={() => {
                  return (
                    <View className="flex-row">
                      <MaterialCommunityIcons
                        name="login-variant"
                        size={22}
                        color="white"
                      />
                      <Text className="text-white ml-2 font-semibold">
                        Login
                      </Text>
                    </View>
                  );
                }}
                onPress={() => {
                  props.navigation.navigate("Login", { mode: "signIn" });
                  props.navigation.closeDrawer();
                }}
                activeBackgroundColor="#0a41cf"
                activeTintColor="#fff"
                inactiveTintColor="#fff"
              />
              <DrawerItem
                label={() => {
                  return (
                    <View className="flex-row">
                      <Feather name="user-plus" size={22} color="white" />
                      <Text className="text-white ml-2 font-semibold">
                        Sign up
                      </Text>
                    </View>
                  );
                }}
                onPress={() => {
                  props.navigation.navigate("Login", { mode: "signUp" });
                  props.navigation.closeDrawer();
                }}
                activeBackgroundColor="#0a41cf"
                activeTintColor="#fff"
                inactiveTintColor="#fff"
              />
              <DrawerItem
                label={() => {
                  return (
                    <View className="flex-row">
                      <MaterialCommunityIcons
                        name="lock-open-check-outline"
                        size={22}
                        color="white"
                      />
                      <Text className="text-white ml-2 font-semibold">
                        Forgot password?
                      </Text>
                    </View>
                  );
                }}
                onPress={() => {
                  props.navigation.navigate("Login", {
                    mode: "forgotPassword",
                  });
                  props.navigation.closeDrawer();
                }}
                activeBackgroundColor="#0a41cf"
                activeTintColor="#fff"
                inactiveTintColor="#fff"
              />
            </>
          )}
          {isAuthenticated && (
            <>
              <DrawerItem
                label={() => {
                  return (
                    <View className="flex-row">
                      <Ionicons name="person-outline" size={22} color="white" />
                      <Text className="text-white ml-2 font-semibold">
                        Profile
                      </Text>
                    </View>
                  );
                }}
                onPress={() => {
                  props.navigation.navigate("Profile");
                  props.navigation.closeDrawer();
                }}
                activeBackgroundColor="#0a41cf"
                activeTintColor="#fff"
                inactiveTintColor="#fff"
              />
              <DrawerItem
                label={() => {
                  return (
                    <View className="flex-row">
                      <MaterialCommunityIcons
                        name="lock-outline"
                        size={22}
                        color="white"
                      />
                      <Text className="text-white ml-2 font-semibold">
                        Update password
                      </Text>
                    </View>
                  );
                }}
                onPress={() => {
                  props.navigation.navigate("UpdatePassword");
                  props.navigation.closeDrawer();
                }}
                activeBackgroundColor="#0a41cf"
                activeTintColor="#fff"
                inactiveTintColor="#fff"
              />
            </>
          )}
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => {
            onShare();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} color={"white"} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: "white",
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        {isAuthenticated && (
          <TouchableOpacity
            onPress={() => {
              handleLogOut();
            }}
            style={{ paddingVertical: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="exit-outline" size={22} color={"white"} />
              <Text
                style={{
                  fontSize: 15,
                  // fontFamily: "Roboto-Medium",
                  color: "white",
                  marginLeft: 5,
                }}
              >
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomDrawer;
