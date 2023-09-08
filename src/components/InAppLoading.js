import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { quotes } from "../../assets/data/quote";

export const InAppLoading = ({ background }) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return (
    <View
      className="flex-1 p-2 items-center justify-center px-4"
      style={{ backgroundColor: background ? background : "transparent" }}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        console.log(width, height);
      }}
    >
      <View className="items-center">
        <LottieView
          source={require("../../assets/Lottie/InAppLoading.json")}
          autoPlay
          loop
          style={{ width: 300 }}
          //   className="mt-12"
        />
        <Text className="text-white text-xl font-semibold mt-2 text-center ">
          {quotes[randomIndex].quote}
        </Text>
        <Text className="text-white mb-2">______</Text>
        <Text className="text-white text-base font-semibold">
          {quotes[randomIndex].player}
        </Text>
        <LottieView
          source={require("../../assets/Lottie/loading.json")}
          autoPlay
          loop
          style={{ width: 180 }}
          //   className="mt-12"
        />
      </View>
    </View>
  );
};
