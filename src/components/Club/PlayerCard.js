import { Image, Text, View } from "react-native";
import { themeColors } from "../../theme";

export const PlayerCard = ({ item }) => {
  return (
    <View className="bg-white rounded-lg mr-2">
      <View className="flex-row">
        {/* stat */}
        <View className="p-2">
          <StatComponent
            title={"Appearances"}
            stat={item.appearances}
          ></StatComponent>
          <StatComponent
            title={"Clean Sheets"}
            stat={item.cleanSheets}
          ></StatComponent>
          <StatComponent title={"Saves"} stat={item.saves}></StatComponent>
          <StatComponent
            title={"Goals \nConceded"}
            stat={item.goalsConceded}
          ></StatComponent>
        </View>
        {/* player image */}
        <View className="bg-red-500 justify-end pb-2 rounded-r-lg">
          <Image
            source={require("../../../assets/images/player.png")}
            className="w-48 h-48"
          ></Image>
        </View>
      </View>

      {/* player name + nationality */}
      <View className="p-2 flex-row">
        <View className="flex-1 mr-2">
          <Text
            className="text-base font-extrabold   "
            style={{ color: themeColors.bgScreen }}
          >
            Erling
          </Text>
          <Text
            className="text-4xl font-extrabold"
            style={{ color: themeColors.bgScreen }}
          >
            Halland
          </Text>
          <Text>
            <Text className="font-bold" style={{ color: themeColors.bgScreen }}>
              9
            </Text>{" "}
            Striker
          </Text>
        </View>
        <View className="items-center">
          <Image
            source={require("../../../assets/images/nationality.png")}
            className="w-16 h-16"
          ></Image>
          <Text style={{ color: themeColors.bgScreen }}>Norway</Text>
        </View>
      </View>
    </View>
  );
};

const StatComponent = ({ title, stat }) => {
  return (
    <View className="mb-1">
      <Text style={{ color: themeColors.bgScreen }} className="text-xs ">
        {title}
      </Text>
      <Text
        className="text-lg font-extrabold "
        style={{ color: themeColors.bgScreen, fontWeight: 900 }}
      >
        {stat}
      </Text>
    </View>
  );
};
