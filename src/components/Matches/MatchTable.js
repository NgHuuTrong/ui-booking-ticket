import { Text, View } from "react-native";
import { MatchCard } from "./MatchCard";
import { themeColors } from "../../theme";

export const MatchTable = ({ roundTitle, roundMatches }) => {
  return (
    <View
      style={{ backgroundColor: themeColors.bgCard }}
      className="rounded-lg mb-4"
    >
      <Text
        className="text-white font-semibold p-4 border-b-slate-500 "
        style={{ borderBottomWidth: 1 }}
      >
        {roundTitle}
      </Text>
      {roundMatches.map((match, i) => {
        return <MatchCard key={match.match_id} matchData={match}></MatchCard>;
      })}
    </View>
  );
};
