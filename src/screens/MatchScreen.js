import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MainLayout } from "../components/Common/MainLayout";
import { useContext, useEffect, useState } from "react";
import { themeColors } from "../theme";
import { MatchCard } from "../components/Matches/MatchCard";
import { DateSection } from "../components/Matches/DateSection";
import { AxiosContext } from "../services/axios.context";
import axios from "axios";
import { datetimeTransform } from "../utils/timeTransform";
import { getAllMatches } from "../services/match.service";

export const MatchScreen = () => {
  // Create an array to store the dates
  const { authAxios, publicAxios } = useContext(AxiosContext);
  const [ref, setRef] = useState(null);
  const [tapRef, setTapRef] = useState(null);
  const [matchDataGroupByDate, setMatchDataGroupByDate] = useState([]);
  const [index, setIndex] = useState(0);
  const [sectionCords, setSectionCords] = useState([]);
  const [tapCords, setTapCords] = useState([]);
  const scrollHandler = (e) => {
    setIndex(e);
    ref.scrollTo({
      x: 0,
      y: sectionCords[e].pos,
      animated: true,
    });
  };
  useEffect(() => {
    const fetchMatches = async () => {
      let data = await getAllMatches(authAxios);
      const dataGroupByDate = {};
      data.forEach((match) => {
        const date = datetimeTransform(match.time, "CustomForMatchScreen");
        if (!dataGroupByDate[date]) {
          dataGroupByDate[date] = [];
        }
        dataGroupByDate[date].push(match);
      });
      for (const [key, value] of Object.entries(dataGroupByDate)) {
        const roundsMap = value.reduce((map, match) => {
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
        dataGroupByDate[key] = roundsArray;
      }
      setMatchDataGroupByDate(dataGroupByDate);
    };
    fetchMatches();
  }, []);
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    for (let i = 0; i < sectionCords.length; i++) {
      if (
        scrollY > sectionCords[i].pos - 100 &&
        scrollY < sectionCords[i].pos + sectionCords[i].offset - 100
      ) {
        setIndex((prev) => i);
        tapRef.scrollTo({
          x: tapCords[i],
          y: 0,
          animated: true,
        });
        break;
      }
    }
  };
  return (
    <MainLayout>
      <View className="h-14 mt-2">
        <ScrollView
          horizontal
          contentContainerStyle={{ alignItems: "center" }}
          ref={(ref) => {
            setTapRef(ref);
          }}
        >
          {index >= 0 &&
            Object.keys(matchDataGroupByDate).map((date, i) => {
              return (
                <Pressable
                  style={
                    index == i
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
                  key={i}
                  onPress={() => scrollHandler(i)}
                  onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    tapCords[i] = layout.x;
                    setTapCords([...tapCords]);
                  }}
                >
                  <Text
                    style={{
                      color:
                        index == i
                          ? themeColors.bgScreen
                          : themeColors.bgButton,
                    }}
                    className="font-bold "
                  >
                    {date}
                  </Text>
                </Pressable>
              );
            })}
        </ScrollView>
      </View>
      <ScrollView
        ref={(ref) => {
          setRef(ref);
        }}
        className="flex-1 px-2"
        style={{ backgroundColor: themeColors.bgScreen }}
        contentContainerStyle={{ paddingBottom: 2 }}
        onScroll={handleScroll}
      >
        {Object.keys(matchDataGroupByDate).map((date, index) => {
          return (
            <View
              key={index}
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                sectionCords[index] = { pos: layout.y, offset: layout.height };
                setSectionCords([...sectionCords]);
              }}
            >
              <DateSection
                date={date}
                matchesByDate={matchDataGroupByDate[date]}
              ></DateSection>
            </View>
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};
