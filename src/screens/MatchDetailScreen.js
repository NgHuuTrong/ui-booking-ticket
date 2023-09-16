import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  ImageBackground,
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
import { getMatch } from "../services/match.service";
import { getStadium } from "../services/stadium.service";
import InAppLoading from "../components/InAppLoading";
import { datetimeTransform } from "../utils/timeTransform";
import { Button } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
import { ErrorAlertModal } from "../components/ErrorAlertModal";

const windowWidth = Dimensions.get("window").width;
export const MatchDetailScreen = ({ navigation, route }) => {
  const [stadium, setStadium] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const { publicAxios } = useContext(AxiosContext);
  const isFocused = useIsFocused();
  const { matchId } = route.params;
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      async function fetchMatch() {
        try {
          const matchData = await getMatch(publicAxios, matchId);
          matchData.time = datetimeTransform(matchData.time);
          matchData.remainSeats =
            matchData.remainSeatsNorth +
            matchData.remainSeatsSouth +
            matchData.remainSeatsEast +
            matchData.remainSeatsWest;
          setMatchData(matchData);
          fetchStadium(matchData.stadiumId);
        } catch (err) {
          setErrorMessage(err.message);
          setIsLoading(false);
        }
      }
      async function fetchStadium(stadiumId) {
        try {
          const data = await getStadium(publicAxios, stadiumId);
          setStadium(data);
        } catch (err) {
          setErrorMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMatch();
    }
  }, [isFocused]);
  const handleNavigate = () => {
    if (matchData.happened == false && matchData.remainSeats > 0) {
      navigation.navigate("ChooseSeat", { matchId: matchData.matchId });
    }
  };
  return (
    <>
      <StatusBar></StatusBar>
      <View className="flex-1">
        <InAppLoading visible={isLoading}></InAppLoading>
        {errorMessage && <ErrorAlertModal message={errorMessage} />}
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
                    name={matchData.homeClub.name}
                    uri={matchData.homeClub.logo}
                    clubId={matchData.homeClubId}
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
                    name={matchData.awayClub.name}
                    uri={matchData.awayClub.logo}
                    clubId={matchData.awayClubId}
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
                    {stadium.name}
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
