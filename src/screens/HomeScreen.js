import React, { useCallback } from "react";
import { FlatList, Image, Linking, Pressable, Text, View } from "react-native";
import { MainLayout } from "../components/Common/MainLayout";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const news = [
  {
    new_id: 1,
    title: "Erling Haaland wins UEFA Men's Player of the Year award",
    thumbnail: "https://editorial.uefa.com/resources/0284-18de529caef6-57a7a4865790-1000/format/wide1/mpoty_winner.jpeg",
    url: "https://www.uefa.com/uefachampionsleague/news/0284-18de529caef8-f362cf4716f7-1000--men-s-player-of-the-year-erling-haaland",
    type: "article"
  },
  {
    new_id: 2,
    title: "Champions League group stage draw: Bayern vs Man United, Napoli vs Real Madrid",
    thumbnail: "https://editorial.uefa.com/resources/0284-18de4e224768-0fdb9474468e-1000/format/wide1/fbl-eur-c1-draw.jpeg",
    url: "https://www.uefa.com/uefachampionsleague/news/0284-18de4e22476b-4b75a3318d8f-1000--champions-league-group-stage-draw-bayern-vs-man-united-n",
    type: "article"
  },
  {
    new_id: 3,
    title: "HIGHLIGHTS: MAN CITY - INTER",
    thumbnail: "https://i.ytimg.com/vi/AXEG_lagq9E/maxresdefault.jpg",
    url: "https://youtu.be/xiPejNMLFvE",
    type: "video"
  },
  {
    new_id: 4,
    title: "HIGHLIGHTS: LIVERPOOL - REAL MADRID",
    thumbnail: "https://i.ytimg.com/vi/MFT6IZ2Ikbk/maxresdefault.jpg",
    url: "https://youtu.be/MFT6IZ2Ikbk",
    type: "video"
  },
  {
    new_id: 5,
    title: "HIGHLIGHTS: REAL MADRID - PSG",
    thumbnail: "https://i.ytimg.com/vi/h_7YTz4BXlA/maxresdefault.jpg",
    url: "https://youtu.be/aytOhsLP2bg",
    type: "video"
  }
]

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

  return (
    <MainLayout>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <View className="flex-row justify-center items-center">
            <Pressable
              className="my-4 rounded-xl overflow-hidden relative"
              style={{
                width: 370,
                height: 200
              }}
              onPress={() => {
                if (item.type === 'article') {
                  handlePress(item.url)
                } else {
                  navigation.navigate("Video", {
                    title: item.title,
                    videoId: item.url.split('https://youtu.be/')[1]
                  })
                }
              }}
            >
              <Image source={{ uri: item.thumbnail }} className="top-0 bottom-0 left-0 right-0 absolute" />
              <View className="absolute top-0 bottom-0 left-0 right-0" style={{
                backgroundColor: 'rgba(0,0,0,0.4)'
              }} />
              <View className="absolute bottom-1 flex-row justify-around items-center px-4">
                <Text className="text-lg text-white font-extrabold mr-10">
                  {item.title}
                </Text>
                {
                  item.type === 'article' && <AntDesign name="upload" size={20} color="white" />
                }
              </View>
              {
                item.type === 'video' && <View className="absolute top-2 right-2">
                  <AntDesign name="playcircleo" size={24} color="white" />
                </View>
              }
            </Pressable>
          </View>
        )}
      />
    </MainLayout>
  );
};