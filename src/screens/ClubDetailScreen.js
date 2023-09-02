import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Tab } from "@rneui/themed";
import { useState } from "react";
import { themeColors } from "../theme";
import { MatchTable } from "../components/Matches/MatchTable";
export const ClubDetailScreen = () => {
  const navigation = useNavigation();
  const [ref, setRef] = useState(null);
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
            <View className="items-center justify-center mb-4">
              <Image
                source={require("../../assets/images/team1.png")}
                className="h-24 w-24"
              />
              <Text className="text-white text-lg font-bold">Man City</Text>
            </View>
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
          <Tab.Item title="Overview" titleStyle={{ fontSize: 14 }} />
          <Tab.Item title="Matches" titleStyle={{ fontSize: 14 }} />
          <Tab.Item title="Squad" titleStyle={{ fontSize: 14 }} />
        </Tab>

        <ScrollView
          ref={(ref) => {
            setRef(ref);
          }}
          style={{ backgroundColor: themeColors.bgScreen }}
        >
          {/* Description */}
          <View className="p-4">
            <Text className="text-white text-xl font-bold mb-4">
              Club Description
            </Text>
            <View
              style={{ backgroundColor: themeColors.bgCard }}
              className="rounded-lg"
            >
              <Text
                className="text-white font-semibold p-4"
                style={{ borderBottomWidth: 1 }}
              >
                Le Manchester City Football Club est un club de football anglais
                basé à Manchester et fondé en 1880 sous le nom de St. Mark's. Le
                club devint le Ardwick Association Football Club en 1887 avant
                de prendre son nom actuel en 1894
              </Text>
            </View>
          </View>

          {/* Previous matches */}
          <View className="mb-3 p-4">
            <Text className="text-white text-xl font-bold mb-4">
              Previous matches
            </Text>
            <MatchTable></MatchTable>
            <MatchTable></MatchTable>
            <MatchTable></MatchTable>
          </View>

          {/* Squad */}
        </ScrollView>
      </View>
    </>
  );
};
