import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { MainLayout } from "../components/Common/MainLayout";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AxiosContext } from "../services/axios.context";
import { getAllNews } from "../services/news.service";
import { ErrorAlertModal } from "../components/ErrorAlertModal";
import AnimatedLottieView from "lottie-react-native";
import { Tab, TabView } from "@rneui/themed";
import { Dimensions } from "react-native";
import { HomeCarousel } from "../components/Home/HomeCarousel";
import { themeColors } from "../theme";
import { getAllMatches } from "../services/match.service";
import { datetimeTransform } from "../utils/timeTransform";
import { MatchCard } from "../components/Matches/MatchCard";
import InAppLoading from "../components/InAppLoading";
const windowWidth = Dimensions.get("window").width;
export const HomeScreen = () => {
  const navigation = useNavigation();
  const handlePress = useCallback(async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
  const [news, setNews] = useState([]);
  const [matchesByDate, setMatchesByDate] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const isFocused = useIsFocused();
  const [index, setIndex] = React.useState(0);
  const { publicAxios } = useContext(AxiosContext);
  const groupStageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const res = await getAllNews(publicAxios);
          setNews(res);

          //match data
          const data = await getAllMatches(publicAxios);
          const currentDate = new Date();
          const filteredData = data.filter(
            (item) => new Date(item.time) > currentDate
          );
          const sortedData = filteredData.sort(
            (data1, data2) => new Date(data1.time) - new Date(data2.time)
          );
          const dataGroupByDate = [];
          sortedData.forEach((match) => {
            const date = datetimeTransform(match.time, "CustomForHomeScreen");
            if (
              dataGroupByDate.length === 0 ||
              dataGroupByDate[dataGroupByDate.length - 1].date !== date
            ) {
              dataGroupByDate.push({
                date: date,
                matchesByDate: [],
              });
            }
            dataGroupByDate[dataGroupByDate.length - 1].matchesByDate.push(
              match
            );
          });
          dataGroupByDate.splice(3);
          setMatchesByDate(dataGroupByDate);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log('status: ' + error.status);
          setErrorMessage(error.message);
        }
      };

      fetchData();
    }
  }, [isFocused]);

  return (
    <MainLayout>
      {errorMessage && <ErrorAlertModal message={errorMessage} />}
      <InAppLoading visible={isLoading}></InAppLoading>
      <ScrollView className="w-full flex-1">
        <HomeCarousel
          title="NEWS"
          data={news.filter((item) => item.type == "article")}
        ></HomeCarousel>

        <View className="justify-center items-center mt-8">
          <Pressable
            className="rounded-xl overflow-hidden relative z-20 justify-center items-center"
            onPress={() => handlePress("https://www.nike.com")}
          >
            <AnimatedLottieView
              source={require("../../assets/Lottie/revenue.json")}
              autoPlay
              loop
              style={{
                height: 200,
              }}
            />
            <Image
              source={require("../../assets/images/nike.png")}
              style={{
                width: (130 * 968) / 479,
                height: 130,
              }}
              className="absolute"
            />
          </Pressable>
        </View>

        <HomeCarousel
          title="HIGHLIGHTS"
          data={news.filter((item) => item.type == "video")}
          playReverse={true}
        ></HomeCarousel>
        <View
          style={{
            width: windowWidth - 25,
            alignSelf: "center",
            backgroundColor: themeColors.bgCard,
          }}
          className="rounded-xl p-2 mb-4 mt-4"
        >
          {matchesByDate.length > 0 && (
            <>
              <Text className="text-white ml-2 mt-2 text-lg font-bold">
                Group Stage
              </Text>
              <Tab
                value={index}
                onChange={(e) => {
                  groupStageRef?.current.scrollToIndex({
                    index: e,
                    animated: true,
                  });
                  setIndex(e);
                }}
                indicatorStyle={{ backgroundColor: themeColors.bgButton }}
              >
                {matchesByDate.map((match, i) => {
                  return (
                    <Tab.Item
                      title={match.date}
                      key={i}
                      titleStyle={{
                        fontSize: 12,
                        fontWeight: "900",
                        color: index == i ? themeColors.bgButton : "white",
                      }}
                    />
                  );
                })}
              </Tab>
              <FlatList
                ref={groupStageRef}
                data={matchesByDate}
                keyExtractor={(item) => item.date}
                horizontal
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={{ width: windowWidth - 25 }} className="pt-2">
                    {item.matchesByDate.map((match) => (
                      <View key={match.matchId} className="mb-2">
                        <MatchCard matchData={match}></MatchCard>
                      </View>
                    ))}
                  </View>
                )}
              ></FlatList>
              <Pressable
                className="p-2 pt-4 border-t-gray-400"
                style={{ borderTopWidth: 1 }}
                onPress={() => navigation.navigate("Match")}
              >
                <Text
                  style={{ color: themeColors.bgButton }}
                  className="font-bold"
                >
                  View all matches {">"}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};
