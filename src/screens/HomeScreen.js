import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { MainLayout } from "../components/Common/MainLayout";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AxiosContext } from "../services/axios.context";
import { getAllNews } from "../services/news.service";
import { ErrorAlertModal } from "../components/ErrorAlertModal";
import AnimatedLottieView from "lottie-react-native";
import Carousel from "react-native-snap-carousel";
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
  const [news, setNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const isFocused = useIsFocused();
  const newsCarousel = useRef(null);
  const { publicAxios } = useContext(AxiosContext);
  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          const res = await getAllNews(publicAxios);
          setNews(res);
        } catch (error) {
          setErrorMessage(error);
        }
      };

      fetchData();
    }
  }, [isFocused]);

  return (
    <MainLayout>
      {errorMessage && <ErrorAlertModal message={errorMessage} />}
      <ScrollView>
        <View className="justify-center items-center mt-8">
          <Pressable
            className="rounded-xl overflow-hidden relative"
            onPress={() => handlePress("https://www.nike.com")}
          >
            <AnimatedLottieView
              source={require("../../assets/Lottie/revenue.json")}
              autoPlay
              loop
              style={{
                height: 203,
              }}
            />
          </Pressable>
          <Image
            source={require("../../assets/images/nike.png")}
            style={{ width: 230, height: (479 / 968) * 230 }}
            className="absolute"
          />
        </View>
        {/* <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={newsCarousel}
          data={news}
          renderItem={(item, index) => (
            <View
              key={index}
              className="bg-black"
              source={{ uri: item.thumbnail }}
              style={{ width: 300, height: 100 }}
            >
              <Text className="text-white">{index}</Text>
            </View>
          )}
          sliderWidth={370}
          itemWidth={300}
          inactiveSlideShift={0}
          useScrollView={true}
        /> */}
      </ScrollView>
    </MainLayout>
  );
};

// renderItem={({ item }) => (
//           <View className="flex-row justify-center items-center">
//             <Pressable
//               className="my-4 rounded-xl overflow-hidden relative"
//               style={{
//                 width: 370,
//                 height: 200,
//               }}
//               onPress={() => {
//                 if (item.type === "article") {
//                   handlePress(item.url);
//                 } else {
//                   navigation.navigate("Video", {
//                     currentVideoId: item.newsId,
//                     videoData: news.filter((item) => item.type === "video"),
//                   });
//                 }
//               }}
//             >
//               <Image
//                 source={{ uri: item.thumbnail }}
//                 className="top-0 bottom-0 left-0 right-0 absolute"
//               />
//               <View
//                 className="absolute top-0 bottom-0 left-0 right-0"
//                 style={{
//                   backgroundColor: "rgba(0,0,0,0.4)",
//                 }}
//               />
//               <View className="absolute bottom-1 flex-row justify-around items-center px-4">
//                 <Text className="text-lg text-white font-extrabold mr-10">
//                   {item.title}
//                 </Text>
//                 {item.type === "article" && (
//                   <AntDesign name="upload" size={20} color="white" />
//                 )}
//               </View>
//               {item.type === "video" && (
//                 <View className="absolute top-2 right-2">
//                   <AntDesign name="playcircleo" size={24} color="white" />
//                 </View>
//               )}
//             </Pressable>
//           </View>
//         )}
