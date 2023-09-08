import { Text, View } from "react-native";
import { MatchTable } from "./MatchTable";
import { useEffect } from "react";
export const DateSection = ({ date, matchesByDate }) => {
  return (
    <View className="mb-3">
      <Text className="text-white text-xl font-bold mb-4">{date}</Text>
      {matchesByDate.map((round, index) => {
        return (
          <MatchTable
            key={index}
            roundTitle={round.round}
            roundMatches={round.matches}
          ></MatchTable>
        );
      })}
    </View>
  );
};
