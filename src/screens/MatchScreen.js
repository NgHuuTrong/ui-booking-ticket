import { Pressable, Text, View } from "react-native";
import { MainLayout } from "../components/Common/MainLayout";
import { useContext, useEffect, useRef, useState } from "react";
import { themeColors } from "../theme";
import { DateSection } from "../components/Matches/DateSection";
import { AxiosContext } from "../services/axios.context";
import { datetimeTransform } from "../utils/timeTransform";
import { getAllMatches } from "../services/match.service";
import InAppLoading from "../components/InAppLoading";
import { FlatList } from "react-native";

export const MatchScreen = () => {
  const { authAxios, publicAxios } = useContext(AxiosContext);
  const tapRef = useRef(null);
  const sectionRef = useRef(null);
  const [matchDataGroupByDate, setMatchDataGroupByDate] = useState([]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //get and work with data from backend
  useEffect(() => {
    const fetchMatches = async () => {
      let data = await getAllMatches(publicAxios);
      const sortedData = data.sort(
        (data1, data2) => new Date(data1.time) - new Date(data2.time)
      );
      const dataGroupByDate = [];
      sortedData.forEach((match) => {
        const date = datetimeTransform(match.time, "CustomForMatchScreen");
        if (
          dataGroupByDate.length == 0 ||
          dataGroupByDate[dataGroupByDate.length - 1].date !== date
        ) {
          dataGroupByDate.push({
            date: date,
            matchesByDate: [],
          });
        }
        dataGroupByDate[dataGroupByDate.length - 1].matchesByDate.push(match);
      });
      dataGroupByDate.forEach((data, index) => {
        const roundsMap = data.matchesByDate.reduce((map, match) => {
          const { round } = match;
          if (!map.has(round)) {
            map.set(round, []);
          }
          map.get(round).push(match);
          return map;
        }, new Map());

        roundsMap.forEach((matches) => {
          matches.sort((a, b) => new Date(a.time) - new Date(b.time));
        });

        const roundsArray = Array.from(roundsMap).map(([round, matches]) => ({
          round,
          matches,
        }));
        dataGroupByDate[index].matchesByDate = roundsArray;
      });
      setMatchDataGroupByDate(dataGroupByDate);
      setIsLoading(false);
    };
    fetchMatches();
  }, []);

  //handle scroll top tap and section to index
  const handleScrollToIndex = (index) => {
    setSectionIndex(index);
    tapRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.1,
    });
    sectionRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  //config for visible item detect
  viewabilityConfig = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 80,
  };
  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length > 0) {
      const currentIndex = viewableItems[0].index;
      setSectionIndex(currentIndex);
      tapRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
        viewPosition: 0.1,
      });
    }
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <MainLayout>
      <View className="h-14 mt-2 flex-1">
        <View>
          <FlatList
            horizontal
            data={matchDataGroupByDate}
            ref={tapRef}
            renderItem={({ item, index }) => (
              <Pressable
                style={
                  index == sectionIndex
                    ? {
                      backgroundColor: themeColors.bgButton,
                    }
                    : {
                      backgroundColor: "transparent",
                      borderWidth: 1,
                      borderColor: themeColors.bgButton,
                    }
                }
                className="h-9 items-center justify-center ml-2 p-2 rounded-lg"
                onPress={() => handleScrollToIndex(index)}
              >
                <Text
                  style={{
                    color:
                      index == sectionIndex
                        ? themeColors.bgScreen
                        : themeColors.bgButton,
                  }}
                  className="font-bold "
                >
                  {item.date}
                </Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.date}
          />
        </View>
        <View className="flex-1 p-4">
          <FlatList
            ref={sectionRef}
            data={matchDataGroupByDate}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            renderItem={({ item, index }) => (
              <View>
                <DateSection
                  date={item.date}
                  matchesByDate={item.matchesByDate}
                ></DateSection>
              </View>
            )}
            keyExtractor={(item) => item.date}
          />
        </View>
      </View>
      <InAppLoading visible={isLoading}></InAppLoading>
    </MainLayout>
  );
};
