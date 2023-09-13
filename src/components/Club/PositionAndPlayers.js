import { FlatList, Text, View } from "react-native";
import { themeColors } from "../../theme";
import { PlayerCard } from "./PlayerCard";

export const PositionAndPlayers = ({ position, players }) => {
  if (players.length == 0) {
    return null;
  }
  return (
    <View
      className="p-4 pr-0 mb-2"
      style={{ backgroundColor: themeColors.bgCard }}
    >
      <Text className="text-white text-xl font-bold mb-4">{position}</Text>
      <FlatList
        data={players}
        renderItem={PlayerCard}
        keyExtractor={(item) => item.footballer_id}
        horizontal
      ></FlatList>
    </View>
  );
};
