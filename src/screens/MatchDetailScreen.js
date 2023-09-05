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
import { useState } from "react";
import { themeColors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { Club } from "../components/Club/Club";
export const MatchDetailScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
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
            <View className="items-center">
              <Text className="text-white">
                Man City win on penalties {" (5-4)"}
              </Text>
            </View>
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
            <View className="flex-row justify-center">
              <View className="items-end">
                <Text className="text-white text-sm ">
                  <Text className="font-bold">Earling Halland</Text> 1', 10',
                  30'
                </Text>
                <Text className="text-white ">
                  <Text className="font-bold">Phil Folden</Text> 2', 25',
                </Text>
              </View>
              <View className="w-8"></View>
              <View className="items-start">
                <Text className="text-white ">
                  <Text className="font-bold">Earling Halland</Text> 89'
                </Text>
              </View>
            </View>
            <View className="flex-row justify-center items-center mt-4">
              <AntDesign name="play" size={24} color="white" />
              <Text className="text-white font-semibold ml-2">
                Watch highlights
              </Text>
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
