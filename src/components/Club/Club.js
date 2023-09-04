import React from "react";
import { Image, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Club = ({ name, uri }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      className="items-center p-4"
      onPress={() => navigation.navigate("ClubDetail")}
    >
      <Image source={{ uri }} style={{ height: 60, aspectRatio: 1 }}></Image>
      <Text className="text-white mt-2 font-bold text-sm">{name}</Text>
    </Pressable>
  );
};
