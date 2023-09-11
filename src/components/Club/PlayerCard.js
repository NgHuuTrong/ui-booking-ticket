import { Image, Text, View } from "react-native";
import { themeColors } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
const background = "#337CCF";
const textColor = "white";
export const PlayerCard = ({ item }) => {
  return (
    <View
      className="rounded-lg mr-2"
      style={{ backgroundColor: themeColors.bgScreen }}
    >
      <View className="flex-row">
        {/* stat */}
        <View className="p-4">
          <StatComponent
            title={"Appearances"}
            stat={item.appearance}
          ></StatComponent>
          <StatComponent
            title={"Birthday"}
            stat={item.birthdate}
          ></StatComponent>
          <StatComponent title={"Height"} stat={item.height}></StatComponent>
          <StatComponent title={"Weight"} stat={item.weight}></StatComponent>
          <StatComponent
            title={"Nationality"}
            stat={item.nationality}
          ></StatComponent>
        </View>
        {/* player image */}
        <View className="justify-start rounded-tr-lg overflow-hidden">
          <Image
            source={{ uri: item.photo }}
            className="w-48"
            style={{ height: 257 }}
          ></Image>
        </View>
      </View>

      {/* player name + nationality */}
      <View className="px-4 pb-2 flex-row">
        <View className="flex-1 justify-center">
          <Text
            className={
              item.name.length > 16
                ? "text-base font-extrabold"
                : "text-lg font-extrabold"
            }
            style={{ color: textColor }}
          >
            {item.name}
          </Text>
        </View>
        <View className="flex-row items-center">
          <View>
            <Ionicons name="shirt" size={40} color={themeColors.bgCard} />
            <Text
              className="absolute text-white font-bold"
              style={
                item.number < 10 ? { top: 13, left: 16 } : { top: 13, left: 12 }
              }
            >
              {item.number}
            </Text>
          </View>
          <Text className="text-white text-lg font-bold">{item.position}</Text>
        </View>
      </View>
    </View>
  );
};

const StatComponent = ({ title, stat }) => {
  return (
    <View className="mb-1">
      <Text style={{ color: textColor }} className="text-xs ">
        {title}
      </Text>
      <Text
        className="text-lg font-extrabold "
        style={{ color: textColor, fontWeight: 900 }}
      >
        {stat}
      </Text>
    </View>
  );
};
