import React from "react";
import { Image, Text, View } from "react-native";

export const GroupClub = ({ club }) => {
  return (
    <View className="flex-row items-center mb-2">
      <View className="flex-row w-1/2 items-center overflow-hidden">
        <Image
          source={{ uri: club.club_logo }}
          className="w-6 h-6 mr-2"
        ></Image>
        <Text numberOfLines={1} className="text-white font-semibold">
          {club.club_name}
        </Text>
      </View>

      <View className="flex-1 items-center">
        <Text className="text-white font-semibold items-center">
          {`${club.wins + club.draws + club.loses < 10 && "0"}${
            club.wins + club.draws + club.loses
          }`}
        </Text>
      </View>
      <View className="flex-1 items-center">
        <Text className="text-white font-semibold items-center">
          {club.wins}
        </Text>
      </View>
      <View className="flex-1 items-center">
        <Text className="text-white font-semibold items-center">
          {club.draws}
        </Text>
      </View>
      <View className="flex-1 items-center">
        <Text className="text-white font-semibold items-center">
          {club.loses}
        </Text>
      </View>
      <View className="flex-1 items-center">
        <Text className="text-white font-semibold items-center">
          {`${club.points < 10 && "0"}${club.points}`}
        </Text>
      </View>
    </View>
  );
};
