import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MainLayout } from "../components/Common/MainLayout";
import { useEffect, useState } from "react";
import { themeColors } from "../theme";
import { MatchCard } from "../components/Matches/MatchCard";
import { DateSection } from "../components/Matches/DateSection";

export const MatchScreen = () => {
  // Create an array to store the dates
  const [dates, setDates] = useState([]);
  useEffect(() => {
    // Define the start and end dates
    const startDate = new Date(2023, 7, 1); // August is 7 because months are zero-indexed
    const endDate = new Date(2023, 8, 1); // September is 8

    // Create an array to store the formatted dates
    const formattedDateArray = [];

    // Options for formatting the date
    const dateFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };

    // Loop through the dates and push formatted dates to the array
    for (
      let currentDate = startDate;
      currentDate < endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      const formattedDate = new Intl.DateTimeFormat(
        "en-US",
        dateFormatOptions
      ).format(currentDate);
      formattedDateArray.push(formattedDate);
    }

    // Display the array of formatted dates
    console.log(formattedDateArray);
    setDates(formattedDateArray);
  }, []);

  return (
    <MainLayout>
      <View className="h-14 mt-2">
        <ScrollView horizontal contentContainerStyle={{ alignItems: "center" }}>
          {dates.map((date, index) => {
            return (
              <Pressable
                style={{ backgroundColor: themeColors.bgButton }}
                className="h-9 items-center justify-center ml-2 p-2 rounded-lg"
                key={index}
              >
                <Text
                  style={{ color: themeColors.bgScreen }}
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
        className="flex-1 px-2"
        style={{ backgroundColor: themeColors.bgScreen }}
        contentContainerStyle={{ paddingBottom: 2 }}
      >
        {dates.map((date, index) => {
          return <DateSection key={index}></DateSection>;
        })}
      </ScrollView>
    </MainLayout>
  );
};