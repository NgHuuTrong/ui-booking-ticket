import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../theme";
export const SubLayout = ({ children, title, goBackButton }) => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 relative bg-black">
      <StatusBar />
      <SafeAreaView
        className={"bg-white flex-1"}
        style={{ backgroundColor: themeColors.bgScreen }}
      >
        <View className="p-4 flex-row justify-center items-center border-b-8 border-b-black drop-shadow-lg ">
          {goBackButton && (
            <TouchableOpacity
              className=" rounded-full absolute left-2 top-4"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={30} color="white" />
            </TouchableOpacity>
          )}
          <View>
            <Text className="text-lg font-bold text-white">{title}</Text>
          </View>
        </View>
        <View className="flex-1 mt-8">{children}</View>
      </SafeAreaView>
    </View>
  );
};
