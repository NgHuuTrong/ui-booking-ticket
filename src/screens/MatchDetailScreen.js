import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { themeColors } from "../theme";
import { Club } from "../components/Club/Club";
import { AxiosContext } from "../services/axios.context";
import { getAllMatches, getMatch } from "../services/match.service";
import { getStadium } from "../services/stadium.service";
import InAppLoading from "../components/InAppLoading";
import { datetimeTransform } from "../utils/timeTransform";
import { Button } from "@rneui/themed";

const windowWidth = Dimensions.get("window").width;
export const MatchDetailScreen = ({ navigation, route }) => {
  const [stadium, setStadium] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const { authAxios, publicAxios } = useContext(AxiosContext);
  const { matchId } = route.params;
  useEffect(() => {
    async function fetchMatch() {
      const matchData = await getMatch(authAxios, matchId);
      matchData.time = datetimeTransform(matchData.time);
      matchData.remainSeats =
        matchData.remain_seats_north +
        matchData.remain_seats_south +
        matchData.remain_seats_east +
        matchData.remain_seats_west;
      setMatchData(matchData);
      fetchStadium(matchData.stadium_id);
    }
    async function fetchStadium(stadium_id) {
      const data = await getStadium(authAxios, stadium_id);
      setTimeout(() => setStadium(data), 1000);
    }
    fetchMatch();
  }, []);
  const handleNavigate = () => {
    if (matchData.happened == false && matchData.remainSeats > 0) {
      navigation.navigate("ChooseSeat", { matchId: matchData.match_id });
    }
  };
  return (
    <>
      <StatusBar></StatusBar>
      <View className="flex-1">
        <View>
          <ImageBackground
            source={require("../../assets/images/MatchDetailBackground.jpg")}
            className="pt-20 pb-4"
          >
            {matchData && (
              <>
                <TouchableOpacity
                  className=" rounded-full absolute left-2 top-4"
                  onPress={() => navigation.goBack()}
                >
                  <AntDesign name="left" size={30} color="white" />
                </TouchableOpacity>
                <View className="flex-row py-8">
                  <Club
                    name={matchData.home_club.name}
                    uri={matchData.home_club.logo}
                    clubId={matchData.home_club_id}
                  />
                  <View className="flex-1 items-center justify-center">
                    {matchData.happened ? (
                      <>
                        <Text className="text-white text-4xl font-bold ">
                          {matchData.result[0]} - {matchData.result[2]}
                        </Text>
                        <Text className="text-white">Full time</Text>
                      </>
                    ) : (
                      <Text className="text-white text-4xl font-bold ">
                        - - -
                      </Text>
                    )}
                  </View>
                  <Club
                    name={matchData.away_club.name}
                    uri={matchData.away_club.logo}
                    clubId={matchData.away_club_id}
                  />
                </View>
              </>
            )}
          </ImageBackground>
        </View>
        <View
          className="flex-1 p-4 mb-2"
          style={{ backgroundColor: "#060e3c" }}
        >
          <ScrollView className="flex-1">
            {stadium && (
              <View
                className="p-4 items-center mb-4"
                style={{ backgroundColor: themeColors.bgCard }}
              >
                <View className="w-full">
                  <Text className="text-white text-xl font-semibold">
                    Stadium: {stadium.name}
                  </Text>
                  <Text className="text-white text-base font-medium">
                    Address: {stadium.address}
                  </Text>
                  <Text className="text-white text-base font-medium">
                    Location: {stadium.location}
                  </Text>
                  <Text className="text-white text-base font-medium mb-2">
                    Capacity: {stadium.capacity}
                  </Text>
                </View>

                <Image
                  source={{ uri: stadium.image }}
                  style={{
                    width: windowWidth - 58,
                    height: (15.88 * (windowWidth - 58)) / 21.17,
                  }}
                ></Image>
              </View>
            )}
            {matchData && (
              <>
                <View
                  className="p-4 mb-4"
                  style={{ backgroundColor: themeColors.bgCard }}
                >
                  <Text className="text-white text-base font-semibold mb-4">
                    {matchData.round}
                  </Text>
                  <Text className="text-stone-300 ">{matchData.time}</Text>
                </View>
                <View
                  className="p-4"
                  style={{ backgroundColor: themeColors.bgCard }}
                >
                  <Button
                    title={
                      matchData.happened
                        ? "Match is overed"
                        : matchData.remainSeats == 0
                        ? "Sold out"
                        : "Choose seat"
                    }
                    titleStyle={{ fontWeight: "700", color: "white" }}
                    buttonStyle={{
                      backgroundColor: "#7d6bfc",
                      height: 60,
                    }}
                    disabled={
                      matchData.happened || matchData.remainSeats == 0
                        ? true
                        : false
                    }
                    containerStyle={{
                      width: "100%",
                      marginVertical: 10,
                    }}
                    onPress={handleNavigate}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
      <InAppLoading visible={stadium == null}></InAppLoading>
    </>
  );
};
