import { StatusBar } from "react-native";
import { Image, ImageBackground, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../theme";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
export const MainLayout = ({ children }) => {
  const navigation = useNavigation();
  const drawerProgress = useDrawerProgress();
  const viewStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);
    return {
      transform: [{ scale }],
    };
  });
  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bgCard }}>
      <Animated.View className="flex-1 bg-white" style={[viewStyles]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={themeColors.bgCard}
        />
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
      </Animated.View>
    </View>
  );
};
