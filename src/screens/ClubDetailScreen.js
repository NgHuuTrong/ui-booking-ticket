import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Tab, TabView } from "@rneui/themed";
import { useContext, useEffect, useState } from "react";
import { themeColors } from "../theme";
import { MatchTable } from "../components/Matches/MatchTable";
import { PlayerCard } from "../components/Club/PlayerCard";
import { AxiosContext } from "../services/axios.context";
import { getClub, getClubMatches } from "../services/club.service";
import InAppLoading from "../components/InAppLoading";
import { MatchCard } from "../components/Matches/MatchCard";
import { PositionAndPlayers } from "../components/Club/PositionAndPlayers";

const windowWidth = Dimensions.get("window").width;
const positions = ["Attacker", "Defender", "Goalkeeper", "Midfielder"];
export const ClubDetailScreen = ({ navigation, route }) => {
  const { clubId } = route.params;
  const [index, setIndex] = useState(0);
  const { authAxios } = useContext(AxiosContext);
  const [clubData, setClubData] = useState(null);
  const [clubMatches, setClubMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchClubData = async () => {
      const data = await getClub(authAxios, clubId);
      const clubMatches = await getClubMatches(authAxios, clubId);
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
      setIsLoading(false);
    };
    fetchClubData();
  }, []);
  return (
    <>
      <StatusBar></StatusBar>
      <View className="flex-1">
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
                    <Text className="text-white text-base font-medium">
                      Location: {clubData.stadium.location}
                    </Text>
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
                        key={match.match_id}
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
                  positions.map((position, index) => {
                    return (
                      <PositionAndPlayers
                        position={position}
                        key={index}
                        players={clubData.footballers.filter(
                          (player) => player.position === position
                        )}
                      ></PositionAndPlayers>
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
