import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../theme";
export const MainLayout = ({ children }) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar />
      <View
        className={"flex-1"}
        style={{ backgroundColor: themeColors.bgScreen }}
      >
        <View className="flex-row justify-center items-center h-24">
          <ImageBackground
            source={require("../../../assets/images/HeaderBackground.jpeg")}
            className="flex-1 h-24 px-4 justify-between items-center flex-row"
          >
            {/* App Logo */}
            <Image
              className="w-12 h-12"
              source={require("../../../assets/images/AppIcon.png")}
            ></Image>

            {/* Icon profile */}
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                className="w-6 h-6"
                source={require("../../../assets/images/ProfileIcon.png")}
              ></Image>
            </Pressable>
          </ImageBackground>
        </View>
        <View
          className="flex-1"
          style={{ backgroundColor: themeColors.bgScreen }}
        >
          {children}
        </View>
      </View>
    </>
  );
};
