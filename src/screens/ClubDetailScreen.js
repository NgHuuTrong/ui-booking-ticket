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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Tab, TabView } from "@rneui/themed";
import { useContext, useEffect, useState } from "react";
import { themeColors } from "../theme";
import { AxiosContext } from "../services/axios.context";
import { getClub, getClubMatches } from "../services/club.service";
import InAppLoading from "../components/InAppLoading";
import { MatchCard } from "../components/Matches/MatchCard";
import { PositionAndPlayers } from "../components/Club/PositionAndPlayers";
import { ErrorAlertModal } from "../components/ErrorAlertModal";

const windowWidth = Dimensions.get("window").width;
const positions = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];
export const ClubDetailScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { clubId } = route.params;
  const [index, setIndex] = useState(0);
  const { publicAxios } = useContext(AxiosContext);
  const [clubData, setClubData] = useState(null);
  const [clubMatches, setClubMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (isFocused) {
      const fetchClubData = async () => {
        try {
          setIsLoading(true);
          const data = await getClub(publicAxios, clubId);
          const clubMatches = await getClubMatches(publicAxios, clubId);
          setClubMatches(clubMatches.matches);
          const weightPattern = /^\d+\s*kg$/;
          const heightPattern = /^\d+\s*cm$/;
          data.footballers.forEach((footballer) => {
            footballer.weight = weightPattern.test(footballer.weight)
              ? footballer.weight
              : "--";
            footballer.height = heightPattern.test(footballer.height)
              ? footballer.height
              : "--";
          });
          setClubData(data);
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchClubData();
    }
  }, [isFocused]);
  return (
    <>
      <StatusBar></StatusBar>
      <View className="flex-1">
        {errorMessage && <ErrorAlertModal message={errorMessage} />}
        <View>
          <ImageBackground
            source={require("../../assets/images/HeaderBackground.jpeg")}
            className="pt-20 pb-4"
          >
            <TouchableOpacity
              className=" rounded-full absolute left-2 top-4"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={30} color="white" />
            </TouchableOpacity>
            {clubData && (
              <View className="items-center justify-center mb-4">
                <Image source={{ uri: clubData.logo }} className="h-24 w-24" />
                <Text className="text-white text-lg font-bold">
                  {clubData.name}
                </Text>
              </View>
            )}
          </ImageBackground>
        </View>

        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: themeColors.bgButton,
            height: 3,
          }}
          containerStyle={{
            backgroundColor: "#151574",
          }}
          variant="primary"
        >
          <Tab.Item
            title="Overview"
            titleStyle={{
              fontSize: 14,
              color: index === 0 ? themeColors.bgButton : "white",
            }}
          />
          <Tab.Item
            title="Matches"
            titleStyle={{
              fontSize: 14,
              color: index === 1 ? themeColors.bgButton : "white",
            }}
          />
          <Tab.Item
            title="Squad"
            titleStyle={{
              fontSize: 14,
              color: index === 2 ? themeColors.bgButton : "white",
            }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item
            style={{ backgroundColor: themeColors.bgScreen, width: "100%" }}
          >
            <ScrollView>
              {/* Description */}
              <View className="p-4">
                <Text className="text-white text-xl font-bold mb-4">
                  Club Description
                </Text>
                {clubData && (
                  <View
                    style={{ backgroundColor: themeColors.bgCard }}
                    className="rounded-lg"
                  >
                    <Text
                      className="text-white font-semibold p-4"
                      style={{ borderBottomWidth: 1 }}
                    >
                      {clubData.description}
                    </Text>
                  </View>
                )}
                <Text className="text-white text-xl font-bold mt-4 mb-2">
                  Stadium
                </Text>
                {clubData && (
                  <View
                    style={{ backgroundColor: themeColors.bgCard }}
                    className="rounded-lg p-2"
                  >
                    <Image
                      source={{ uri: clubData.stadium.image }}
                      style={{
                        width: windowWidth - 48,
                        height: (15.88 * (windowWidth - 48)) / 21.17,
                      }}
                    ></Image>
                    <Text className="text-white text-xl font-semibold mt-2">
                      {clubData.stadium.name}
                    </Text>
                    <Text className="text-white text-base font-medium">
                      Address: {clubData.stadium.address}
                    </Text>
                    <Text className="text-white text-base font-medium mb-2">
                      Location: {clubData.stadium.location}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MapBox", {
                          longitude: Number(
                            clubData.stadium.coordinates.split(", ")[1]
                          ),
                          latitude: Number(
                            clubData.stadium.coordinates.split(", ")[0]
                          ),
                          longitudeDelta: 0.01,
                          latitudeDelta: 0.01,
                          stadiumName: clubData.stadium.name,
                          clubName: clubData.name,
                        })
                      }
                      className="p-3 items-center mb-2"
                      style={{ backgroundColor: themeColors.bgButton }}
                    >
                      <Text className="font-bold text-base">View map</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          </TabView.Item>
          <TabView.Item
            style={{ backgroundColor: themeColors.bgScreen, width: "100%" }}
          >
            <ScrollView>
              <View className="p-4">
                {clubMatches.length > 0 && (
                  <>
                    <Text className="text-white text-xl font-bold mb-4">
                      Previous matches
                    </Text>

                    {clubMatches.map((match) => (
                      <View
                        className="p-2 rounded-lg mb-2"
                        style={{ backgroundColor: themeColors.bgCard }}
                        key={match.matchId}
                      >
                        <MatchCard matchData={match}></MatchCard>
                      </View>
                    ))}
                  </>
                )}
              </View>
            </ScrollView>
          </TabView.Item>
          <TabView.Item
            style={{ backgroundColor: themeColors.bgCard, width: "100%" }}
          >
            <ScrollView>
              <View>
                {clubData &&
                  positions.map((position, idx) => {
                    return (
                      <PositionAndPlayers
                        position={position}
                        players={clubData.footballers.filter(
                          (player) => player.position === position
                        )}
                        key={idx}
                      />
                    );
                  })}
              </View>
            </ScrollView>
          </TabView.Item>
        </TabView>
      </View>
      <InAppLoading visible={isLoading}></InAppLoading>
    </>
  );
};
