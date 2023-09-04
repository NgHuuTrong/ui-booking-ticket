import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { themeColors } from "../../theme";
import { Club } from "../Club/Club";
import { useNavigation } from "@react-navigation/core";
import { datetimeTransform } from "../../utils/timeTransform";

const { width } = Dimensions.get("window");

export const TicketCard = ({ item, hasExpand = true }) => {
  const navigation = useNavigation();

  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand((prev) => (prev = !prev));
  };

  return (
    <View
      className=" rounded-2xl m-4 items-center"
      style={{ backgroundColor: themeColors.bgCard, width: width - 32 }}
    >
      <ImageBackground
        source={require("../../../assets/images/TicketBackground.jpg")}
        style={{ objectFit: "contain" }}
      >
        <Text
          style={{ color: themeColors.bgButton }}
          className="text-white text-base font-bold"
        >
          {datetimeTransform(item.match.time, "date")}
        </Text>
        <Text
          className="text-white text-base"
          style={{ color: themeColors.bgButton }}
        >
          {datetimeTransform(item.match.time, "time")}
        </Text>
        <View className="flex-row w-full  items-center">
          <View className="flex-1 justify-center">
            <Club name={item.homeClub.name} uri={item.homeClub.logo} />
          </View>

          <View className="flex-none">
            <Text className="text-white text-base font-bold">VS</Text>
          </View>

          <View className="flex-1 justify-center">
            <Club name={item.awayClub.name} uri={item.awayClub.logo} />
          </View>
        </View>
      </ImageBackground>
      {hasExpand &&
        (expand ? (
          <View className="w-full">
            <View className="flex-row">
              <View className="flex-1">
                <Text className="text-white font-light">
                  Area: {item.ticket.area}
                </Text>
                <Text className="text-white font-light">
                  Seat: {item.ticket.seat}
                </Text>
              </View>

              <View className="flex-1">
                <TouchableOpacity
                  onPress={() => navigation.navigate("TicketDetail", { item })}
                  style={{ backgroundColor: themeColors.bgButton }}
                  className="rounded-lg p-2 items-center"
                >
                  <Text className="font-bold">Detail</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-2 h-0.5 bg-white w-full"></View>
            <TouchableOpacity
              className="w-full items-center"
              style={{ backgroundColor: themeColors.bgScreen }}
              onPress={handleExpand}
            >
              <Entypo name="arrow-bold-up" color={"white"} size={22} />
            </TouchableOpacity>
          </View>
        ) : (
          <View className=" w-full">
            <View className="h-0.5 bg-white w-full"></View>
            <TouchableOpacity
              className="w-full items-center"
              style={{ backgroundColor: themeColors.bgScreen }}
              onPress={handleExpand}
            >
              <Entypo name="arrow-bold-down" color={"white"} size={22} />
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};
