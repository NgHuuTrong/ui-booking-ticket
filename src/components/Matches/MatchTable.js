import { Text, View } from "react-native";
import { MatchCard } from "./MatchCard";
import { themeColors } from "../../theme";

export const MatchTable = () => {
  return (
    <View
      style={{ backgroundColor: themeColors.bgCard }}
      className="rounded-lg mb-4"
    >
      <Text
        className="text-white font-semibold p-4 border-b-slate-500 "
        style={{ borderBottomWidth: 1 }}
      >
        Second qualifying round - 2nd leg
      </Text>
      <MatchCard></MatchCard>
    </View>
  );
};
