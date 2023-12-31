import { Image, Pressable, Text, View } from "react-native";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export const MatchCard = ({ matchData }) => {
  const navigation = new useNavigation();
  return (
    <Pressable
      className="flex-row p-2"
      onPress={() =>
        navigation.navigate("MatchDetail", {
          matchId: matchData.matchId,
        })
      }
    >
      <View className="flex-1 justify-center">
        <View className="flex-row justify-between mb-2">
          <View className="flex-row">
            <Image
              source={{
                uri: matchData.homeClub.logo,
              }}
              className="w-6 h-6 mr-2"
            ></Image>
            <Text className="text-white font-semibold">
              {matchData.homeClub.name}
            </Text>
          </View>
          <Text className="text-white font-semibold">
            {matchData.happened ? matchData.result[0] : "-"}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row">
            <Image
              source={{
                uri: matchData.awayClub.logo,
              }}
              className="w-6 h-6 mr-2"
            ></Image>
            <Text className="text-white font-semibold">
              {matchData.awayClub.name}
            </Text>
          </View>
          <Text className="text-white font-semibold">
            {matchData.happened ? matchData.result[2] : "-"}
          </Text>
        </View>
      </View>
      <View
        className="p-4 items-center justify-center border-l-slate-500 ml-4"
        style={{ borderLeftWidth: 1 }}
      >
        {matchData.happened && (
          <Text className="text-slate-200 font-semibold">Full times</Text>
        )}
        <Text className="font-semibold" style={{ color: themeColors.bgButton }}>
          View details
        </Text>
      </View>
    </Pressable>
  );
};
