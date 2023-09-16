import { Dimensions, Pressable, Text, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import { themeColors } from "../theme";
import YoutubeIframe from "react-native-youtube-iframe";
import {
  OffsetYProvider,
  IndexProvider,
  InCenterConsumer,
} from "@n1ru4l/react-in-center-of-screen";
import { FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { height: windowHeight } = Dimensions.get("window");
const boxHeight = windowHeight / 3;
export const VideoPlayerScreen = ({ route, navigation }) => {
  const { currentVideoId, videoData } = route.params;
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const flatListRef = useRef(null);
  useEffect(() => {
    const idsArray = [...videoData.map((video) => video.newsId)];
    const indexOfCurrentVideo = idsArray.indexOf(currentVideoId);
    videoData[0] = videoData.splice(indexOfCurrentVideo, 1, videoData[0])[0];
    setVideos([...videoData]);
  }, []);
  const handleScroll = (index) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewOffset: boxHeight,
    });
  };
  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bgScreen }}>
      <Pressable
        className=" rounded-full absolute left-4 top-8 z-10"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={25} color="white" />
      </Pressable>
      <Text
        className="font-semibold text-white top-8 z-10"
        style={{ position: "absolute", alignSelf: "center" }}
      >
        {currentVideo + 1 > videos.length ? currentVideo : currentVideo + 1} of{" "}
        {videos.length} videos
      </Text>
      <OffsetYProvider
        columnsPerRow={1}
        listItemHeight={boxHeight}
        centerYStart={0}
        centerYEnd={(windowHeight * 1) / 3}
      >
        {({ setOffsetY }) => (
          <FlatList
            data={videos}
            ref={flatListRef}
            onScroll={(ev) => {
              setOffsetY(ev.nativeEvent.contentOffset.y);
              setCurrentVideo(
                Math.floor((ev.nativeEvent.contentOffset.y * 2) / boxHeight)
              );
            }}
            ListHeaderComponent={() => (
              <View style={{ height: boxHeight }}></View>
            )}
            ListFooterComponent={() => (
              <View style={{ height: boxHeight }}></View>
            )}
            keyExtractor={(item) => item.newsId}
            renderItem={({ index, item }) => (
              <IndexProvider index={index}>
                {() => (
                  <View
                    style={{
                      height: boxHeight,
                    }}
                  >
                    <InCenterConsumer>
                      {({ isInCenter }) => {
                        return (
                          <View>
                            <YoutubeIframe
                              height={boxHeight - 50}
                              play={isInCenter}
                              videoId={item.url.split("https://youtu.be/")[1]}
                              full
                              op
                            />
                            <View className="px-2">
                              <Text className="text-white">{item.title}</Text>
                            </View>
                            {!isInCenter && (
                              <Pressable
                                onPress={handleScroll.bind(this, index)}
                                style={{
                                  height: boxHeight,
                                  backgroundColor: "rgba(8, 4, 68, 1)",
                                  width: "100%",
                                  opacity: 0.5,
                                }}
                                className="absolute top-0 left-0"
                              ></Pressable>
                            )}
                          </View>
                        );
                      }}
                    </InCenterConsumer>
                  </View>
                )}
              </IndexProvider>
            )}
          />
        )}
      </OffsetYProvider>
    </View>
  );
};
