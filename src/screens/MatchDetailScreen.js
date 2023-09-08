import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { themeColors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { Club } from "../components/Club/Club";
import { AxiosContext } from "../services/axios.context";
import { getAllMatches } from "../services/match.service";
export const MatchDetailScreen = ({ navigation, route }) => {
  const { authAxios, publicAxios } = useContext(AxiosContext);
  const { matchData } = route.params;
  console.log(matchData);
  useEffect(() => {
    // async function fetchMachDetail() {
    //   const data = await getAllMatches(authAxios);
    //   console.log(data);
    // }
    // test();
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
            <View className="flex-row">
              <Club
                name={"Mancity"}
                uri={"https://media.api-sports.io/football/teams/50.png"}
              />
              <View className="flex-1 items-center justify-center">
                <Text className="text-white text-4xl font-bold ">5 - 1</Text>
                <Text className="text-white">Full time</Text>
              </View>
              <Club
                name={"Arsenal"}
                uri={"https://media-3.api-sports.io/football/teams/42.png"}
              />
            </View>
          </ImageBackground>
        </View>

        <View
          className="p-4 flex-1"
          style={{ backgroundColor: themeColors.bgScreen }}
        >
          <View className="mb-3">
            <Text className="text-white text-xl font-bold mb-4">Line-ups</Text>
          </View>
          <View
            className="flex-row flex-1 border-white p-4 rounded-lg"
            style={{ borderWidth: 1 }}
          >
            <View className="w-1/2">
              <View className="items-center flex-row mb-4">
                <Image
                  source={require("../../assets/images/team1.png")}
                  style={{ width: 40, aspectRatio: 1 }}
                ></Image>
                <Text className="text-white">Man City</Text>
              </View>
              <View className="flex-row mb-4">
                <View className="justify-center items-center w-10">
                  <Ionicons
                    name="shirt"
                    size={30}
                    color="blue"
                    style={{ position: "absolute" }}
                  />
                  <Text className="text-white ">9</Text>
                </View>
                <Text className="text-white">Erling Haaland</Text>
              </View>
              <View className="flex-row mb-4">
                <View className="justify-center items-center w-10">
                  <Ionicons
                    name="shirt"
                    size={30}
                    color="blue"
                    style={{ position: "absolute" }}
                  />
                  <Text className="text-white ">9</Text>
                </View>
                <Text className="text-white">Erling Haaland</Text>
              </View>
              <View className="flex-row mb-4">
                <View className="justify-center items-center w-10">
                  <Ionicons
                    name="shirt"
                    size={30}
                    color="blue"
                    style={{ position: "absolute" }}
                  />
                  <Text className="text-white ">9</Text>
                </View>
                <Text className="text-white">Erling Haaland</Text>
              </View>
            </View>
            <View className="w-1/2">
              <View className="items-center flex-row mb-4">
                <Image
                  source={require("../../assets/images/team1.png")}
                  style={{ width: 40, aspectRatio: 1 }}
                ></Image>
                <Text className="text-white">Man City</Text>
              </View>
              <View className="flex-row mb-4">
                <View className="justify-center items-center w-10">
                  <Ionicons
                    name="shirt"
                    size={30}
                    color="blue"
                    style={{ position: "absolute" }}
                  />
                  <Text className="text-white ">9</Text>
                </View>
                <Text className="text-white">Erling Haaland</Text>
              </View>
              <View className="flex-row mb-4">
                <View className="justify-center items-center w-10">
                  <Ionicons
                    name="shirt"
                    size={30}
                    color="blue"
                    style={{ position: "absolute" }}
                  />
                  <Text className="text-white ">9</Text>
                </View>
                <Text className="text-white">Erling Haaland</Text>
              </View>
              <View className="flex-row mb-4">
                <View className="justify-center items-center w-10">
                  <Ionicons
                    name="shirt"
                    size={30}
                    color="blue"
                    style={{ position: "absolute" }}
                  />
                  <Text className="text-white ">9</Text>
                </View>
                <Text className="text-white">Erling Haaland</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
