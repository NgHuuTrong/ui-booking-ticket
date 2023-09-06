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

export const MatchScreen = () => {
  // Create an array to store the dates
  const [dates, setDates] = useState([]);
  const { authAxios, publicAxios } = useContext(AxiosContext);
  useEffect(() => {
    const test = async () => {
      const data = await authAxios.get("/matches");
      console.log("res", data);
    };
    test();
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
