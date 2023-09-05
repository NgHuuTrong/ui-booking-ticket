import React from "react";
import { GroupClub } from "./groupClub";
import { themeColors } from "../../theme";
import { Text, View } from "react-native";

export const GroupCart = ({ group }) => {
  return (
    <View
      className="p-4 rounded-2xl m-4"
      style={{ backgroundColor: themeColors.bgCard }}
    >
      <Text className="text-white text-xl font-bold mb-4">
        Group {group.group_name}
      </Text>
      <View className="flex-row items-center mb-2">
        <View className="flex-row w-1/2"></View>

        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">Pl</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">W</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">D</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">L</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">Pts</Text>
        </View>
      </View>
      {group.clubs.map((club) => (
        <GroupClub club={club} key={club.club_id} />
      ))}
    </View>
  );
};
