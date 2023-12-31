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

export const TicketCard = ({ ticket }) => {
  const navigation = useNavigation();
  return (
    <View
      className=" rounded-2xl m-4 items-center border-white overflow-hidden"
      style={{
        backgroundColor: themeColors.bgCard,
        width: width - 32,
        borderWidth: 0.9,
      }}
    >
      <ImageBackground
        source={require("../../../assets/images/TicketBackground.jpg")}
        style={{ objectFit: "contain" }}
      >
        <View className="items-center pt-4">
          <Text className="text-white text-xl font-bold">
            {datetimeTransform(ticket.match.time, "date")}
          </Text>
          <Text className="text-white text-base font-bold">
            {datetimeTransform(ticket.match.time, "time")}
          </Text>
        </View>
        <View className="flex-row w-full items-center">
          <View className="flex-1 items-center">
            <Club
              name={ticket.match.homeClub.name}
              uri={ticket.match.homeClub.logo}
              clubId={ticket.match.homeClubId}
            />
          </View>

          <View className="items-center justify-center">
            <Text className="text-slate-900  text-2xl font-extrabold">VS</Text>
          </View>

          <View className="flex-1 items-center">
            <Club
              name={ticket.match.awayClub.name}
              uri={ticket.match.awayClub.logo}
              clubId={ticket.match.homeClubId}
            />
          </View>
        </View>

        <View className="flex-row bg-white p-2 justify-between opacity-80">
          <View className="justify-center flex-row items-center">
            <Text
              className="text-slate-900 font-bold text-base mr-8"
              style={{ color: "#0e143c" }}
            >
              Area: {ticket.area}
            </Text>
            <Text
              className="text-slate-900 font-bold text-base"
              style={{ color: "#0e143c" }}
            >
              Seat: {ticket.seat}
            </Text>
          </View>

          <View className="items-center justify-center">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TicketDetail", {
                  ticketId: ticket.ticketId,
                })
              }
              style={{ backgroundColor: "#002fa5" }}
              className="rounded-lg p-2 items-center w-28"
            >
              <Text className="font-bold text-white">View details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
