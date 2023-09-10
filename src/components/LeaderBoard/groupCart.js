import React from "react";
import { GroupClub } from "./groupClub";
import { themeColors } from "../../theme";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const GroupCart = ({ group, viewBtn = true }) => {
  const navigation = useNavigation();
  return (
    <View
      className="py-4 px-2 rounded-2xl m-4"
      style={{ backgroundColor: themeColors.bgCard }}
    >
      <View className="flex-row justify-between px-4">
        <Text className="text-white text-xl font-bold mb-4">
          Group {group.groupName}
        </Text>
        {viewBtn && (
          <TouchableOpacity
            className="items-center"
            onPress={() =>
              navigation.navigate("GroupDetail", { groupId: group.groupId })
            }
          >
            <Text
              className="text-s, font-bold"
              style={{ color: themeColors.bgButton }}
            >
              View detail
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-row items-center mb-2">
        <View className="flex-row w-1/2"></View>

        <View className="flex-1 items-center">
          <Text className="items-center" style={{ color: "lightgray" }}>
            Pl
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="items-center" style={{ color: "lightgray" }}>
            W
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="items-center" style={{ color: "lightgray" }}>
            D
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="items-center" style={{ color: "lightgray" }}>
            L
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="items-center" style={{ color: "lightgray" }}>
            Pts
          </Text>
        </View>
      </View>
      {group.groupClubs.map((groupClub, idx) => (
        <GroupClub groupClub={groupClub} key={groupClub.clubId} idx={idx} />
      ))}
    </View>
  );
};
