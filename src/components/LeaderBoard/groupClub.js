import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const GroupClub = ({ groupClub, idx }) => {
  return (
    <>
      <View
        className="w-full my-3"
        style={{
          backgroundColor: "lightgray",
          height: StyleSheet.hairlineWidth,
        }}
      ></View>
      <View className="flex-row items-center mb-2">
        <View className="flex-row w-1/2 items-center overflow-hidden">
          <Text className="mr-2" style={{ color: "lightgray" }}>
            {idx + 1}
          </Text>
          <Image
            source={{ uri: groupClub.club.logo }}
            className="w-6 h-6 mr-2"
          ></Image>
          <Text numberOfLines={1} className="text-white font-semibold">
            {groupClub.club.name}
          </Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">
            {`${
              groupClub.wins + groupClub.draws + groupClub.loses < 10 && "0"
            }${groupClub.wins + groupClub.draws + groupClub.loses}`}
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">
            {groupClub.wins}
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">
            {groupClub.draws}
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">
            {groupClub.loses}
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-semibold items-center">
            {`${groupClub.points < 10 && "0"}${groupClub.points}`}
          </Text>
        </View>
      </View>
    </>
  );
};
