import { Dimensions, Linking, Pressable } from "react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { AntDesign } from "@expo/vector-icons";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
export const HomeCarousel = ({ title, data, playReverse }) => {
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
    <>
      <Text className="text-white ml-4 mt-8 text-2xl font-bold italic">
        {title}
      </Text>
      <Carousel
        autoPlayReverse={playReverse}
        loop
        width={windowWidth}
        height={(479 / 968) * windowWidth * 1.3}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={2000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.94,
          parallaxScrollingOffset: 60,
        }}
        pagingEnabled={true}
        snapEnabled={true}
        renderItem={({ item, index }) => (
          <View
            className="my-4 flex-row justify-center items-center"
            style={{
              width: windowWidth,
              height: (479 / 968) * (windowWidth - 50) * 1.3,
            }}
          >
            <Pressable
              className="rounded-xl overflow-hidden relative"
              onPress={() => {
                if (item.type === "article") {
                  handlePress(item.url);
                } else {
                  navigation.navigate("Video", {
                    currentVideoId: item.newsId,
                    videoData: data,
                  });
                }
              }}
              style={{
                width: windowWidth - 50,
                height: (479 / 968) * (windowWidth - 50) * 1.3,
              }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                className="top-0 bottom-0 left-0 right-0 absolute"
                style={{
                  width: windowWidth - 50,
                  height: (479 / 968) * windowWidth * 1.3,
                }}
              />
              <View
                className="absolute top-0 bottom-0 left-0 right-0"
                style={
                  {
                    //   backgroundColor: "rgba(0,0,0,0.2)",
                  }
                }
              />
              <View
                className="absolute bottom-0 flex-row justify-around items-center px-4 w-full"
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              >
                <Text className="text-lg text-white font-extrabold mr-10 mb-2">
                  {item.title}
                </Text>
              </View>
              {item.type === "video" && (
                <View className="absolute top-2 right-2">
                  <AntDesign name="playcircleo" size={24} color="white" />
                </View>
              )}
            </Pressable>
          </View>
        )}
      />
    </>
  );
};
