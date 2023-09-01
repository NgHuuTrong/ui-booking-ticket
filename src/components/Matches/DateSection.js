import { Text, View } from "react-native";
import { MatchTable } from "./MatchTable";
export const DateSection = () => {
  return (
    <View className="mb-3">
      <Text className="text-white text-xl font-bold mb-4">
        Wednesday, 2 August, 2023
      </Text>
      <MatchTable></MatchTable>
    </View>
  );
};
